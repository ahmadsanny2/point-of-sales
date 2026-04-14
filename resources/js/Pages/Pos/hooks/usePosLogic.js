import { useState, useMemo, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

/**
 * Custom hook yang mengelola seluruh business logic pada halaman POS.
 * Memisahkan logika dari tampilan (UI) agar lebih mudah dibaca dan diuji.
 *
 * @param {Array}   products            - Daftar produk dari server
 * @param {string}  midtrans_client_key - Client key Midtrans
 * @param {boolean} is_production       - Flag environment Midtrans
 */
export function usePosLogic({ products, midtrans_client_key, is_production }) {
    const { flash } = usePage().props;

    // ─── UI State ────────────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [tenderedAmount, setTenderedAmount] = useState("");
    const [showMobileCart, setShowMobileCart] = useState(false);

    // ─── Cart State ───────────────────────────────────────────────────────────
    const [cart, setCart] = useState([]);

    // ─── Form (Inertia) ───────────────────────────────────────────────────────
    const { data, setData, post, processing } = useForm({
        payment_method: "cash",
        cart: [],
    });

    // ─── Side Effects ─────────────────────────────────────────────────────────

    /**
     * Memuat script Midtrans Snap ke dalam DOM.
     * Script dihapus ketika komponen di-unmount.
     */
    useEffect(() => {
        if (!midtrans_client_key) return;

        const script = document.createElement("script");
        script.src = is_production
            ? "https://app.midtrans.com/snap/snap.js"
            : "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", midtrans_client_key);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [midtrans_client_key, is_production]);

    /**
     * Mendeteksi snap_token dari server flash dan menampilkan UI Midtrans Snap.
     * Menangani semua skenario: sukses, pending, error, dan close.
     */
    useEffect(() => {
        if (flash?.snap_token && window.snap) {
            setShowPaymentModal(false);
            window.snap.pay(flash.snap_token.token, {
                onSuccess: () => {
                    router.post(
                        route("pos.payment-success"),
                        { invoice_number: flash.snap_token.invoice },
                        { onSuccess: () => setCart([]) },
                    );
                },
                onPending: () => {
                    Swal.fire(
                        "Tertunda",
                        "Pembayaran tertunda. Anda bisa membayarnya nanti.",
                        "info",
                    );
                },
                onError: () => {
                    Swal.fire(
                        "Gagal",
                        "Sistem gagal memproses pembayaran.",
                        "error",
                    );
                },
                onClose: () => {
                    Swal.fire(
                        "Dibatalkan",
                        "Anda menutup halaman sebelum menyelesaikan pembayaran.",
                        "warning",
                    );
                },
            });
        }
    }, [flash]);

    // ─── Derived State (Memoized) ─────────────────────────────────────────────

    /** Produk yang sudah difilter berdasarkan kategori aktif dan query pencarian. */
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                activeCategory === "all" ||
                product.category_id === activeCategory;
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (product.sku &&
                    product.sku
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [products, activeCategory, searchQuery]);

    /** Kalkulasi harga: subtotal, pajak (PPN 11%), dan total. */
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const tax = subtotal * 0.11;
    const total = subtotal + tax;

    // ─── Cart Actions ─────────────────────────────────────────────────────────

    /** Menambahkan produk ke keranjang. Jika sudah ada, menaikkan qty (max = stok). */
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    Swal.fire({
                        icon: "warning",
                        title: "Stok Terbatas!",
                        text: "Barang yang ditambahkan melampaui stok yang tersedia.",
                        confirmButtonColor: "#3085d6",
                    });
                    return prev;
                }
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    /**
     * Mengubah qty item di keranjang.
     * @param {number} id    - ID produk
     * @param {number} delta - +1 atau -1
     */
    const updateQuantity = (id, delta) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    if (newQuantity < 1) return item;
                    if (newQuantity > item.stock) {
                        Swal.fire({
                            icon: "warning",
                            title: "Stok Terbatas!",
                            text: "Barang yang ditambahkan melampaui persediaan pabrik.",
                            confirmButtonColor: "#3085d6",
                        });
                        return item;
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }),
        );
    };

    /** Menghapus item dari keranjang berdasarkan ID. */
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    // ─── Payment Actions ──────────────────────────────────────────────────────

    /** Membuka modal pembayaran dan menyinkronkan cart ke form Inertia. */
    const handleCheckout = () => {
        if (cart.length === 0) return;
        setData("cart", cart);
        setShowPaymentModal(true);
        setTenderedAmount("");
    };

    /** Memvalidasi uang tunai lalu mengirim request checkout ke server. */
    const submitPayment = () => {
        if (data.payment_method === "cash" && Number(tenderedAmount) < total) {
            return Swal.fire({
                icon: "error",
                title: "Pembayaran Kurang!",
                text: "Uang yang diterima kurang dari total tagihan bayar.",
                confirmButtonColor: "#d33",
            });
        }

        post(route("pos.checkout"), {
            onSuccess: () => {
                setCart([]);
                setShowPaymentModal(false);
            },
        });
    };

    // ─── Return ───────────────────────────────────────────────────────────────
    return {
        // State
        flash,
        cart,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        showPaymentModal,
        setShowPaymentModal,
        tenderedAmount,
        setTenderedAmount,
        showMobileCart,
        setShowMobileCart,

        // Form
        data,
        setData,
        processing,

        // Derived
        filteredProducts,
        subtotal,
        tax,
        total,

        // Actions
        addToCart,
        updateQuantity,
        removeFromCart,
        handleCheckout,
        submitPayment,
    };
}
