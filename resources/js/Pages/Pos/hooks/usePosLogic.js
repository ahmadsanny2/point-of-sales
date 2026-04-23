import { useState, useMemo, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

/**
 * Custom hook yang mengelola seluruh business logic pada halaman POS.
 * Memisahkan logika dari tampilan (UI) agar lebih mudah dibaca dan diuji.
 *
 * @param {Array}   products            - Daftar produk dari server
 * @param {Array}   cart_items          - Daftar item keranjang dari server
 * @param {Array}   payment_channels    - Daftar channel pembayaran Tripay
 */
export function usePosLogic({ products, cart_items, payment_channels }) {
    const { flash } = usePage().props;

    // ─── UI State ────────────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [tenderedAmount, setTenderedAmount] = useState("");
    const [showMobileCart, setShowMobileCart] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState(null);

    // ─── Cart State (Synchronized with props) ────────────────────────────────
    const [cart, setCart] = useState(cart_items || []);

    // Sync state when props change (after server actions)
    useEffect(() => {
        setCart(cart_items || []);
    }, [cart_items]);

    // ─── Form (Inertia) ───────────────────────────────────────────────────────
    const { data, setData, post, processing } = useForm({
        payment_method: "cash",
        cart: [],
    });

    // ─── Side Effects ─────────────────────────────────────────────────────────

    /** Mendeteksi tripay_transaction dari server flash */
    useEffect(() => {
        if (flash?.tripay_transaction) {
            setPaymentInstructions(flash.tripay_transaction);
            setShowPaymentModal(true); // Pastikan modal tetap terbuka untuk menampilkan instruksi
        }
    }, [flash]);

    // Reset instructions when modal is closed manually
    useEffect(() => {
        if (!showPaymentModal) {
            setPaymentInstructions(null);
        }
    }, [showPaymentModal]);

    // ─── Derived State (Memoized) ─────────────────────────────────────────────

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = activeCategory === "all" || product.category_id === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [products, activeCategory, searchQuery]);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.11;
    const total = subtotal + tax;

    // ─── Cart Actions (Server-side persistence) ──────────────────────────────

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing && existing.quantity >= product.stock) {
            Swal.fire({ icon: "warning", title: "Stok Terbatas!" });
            return;
        }

        router.post(route("pos.cart.add"), { product_id: product.id }, {
            preserveScroll: true,
            onSuccess: () => {
                // State will be updated via useEffect when cart_items prop changes
            }
        });
    };

    const updateQuantity = (id, delta) => {
        const item = cart.find((i) => i.id === id);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;
        if (newQuantity > item.stock) {
            Swal.fire({ icon: "warning", title: "Stok Terbatas!" });
            return;
        }

        router.put(route("pos.cart.update"), { 
            product_id: id, 
            quantity: newQuantity 
        }, { preserveScroll: true });
    };

    const removeFromCart = (id) => {
        router.delete(route("pos.cart.remove"), { 
            data: { product_id: id },
            preserveScroll: true 
        });
    };

    // ─── Payment Actions ──────────────────────────────────────────────────────

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setData("cart", cart);
        setShowPaymentModal(true);
        setTenderedAmount("");
    };

    const submitPayment = () => {
        if (data.payment_method === "cash" && Number(tenderedAmount) < total) {
            return Swal.fire({ icon: "error", title: "Pembayaran Kurang!" });
        }

        console.log("Submitting payment for method:", data.payment_method);

        post(route("pos.checkout"), {
            preserveScroll: true,
            onSuccess: () => {
                // Jangan tutup modal jika ini adalah pembayaran non-tunai (Tripay)
                // karena kita ingin menampilkan instruksi/QR Code di modal yang sama.
                if (data.payment_method === "cash") {
                    setShowPaymentModal(false);
                }
            },
            onError: (errors) => {
                console.error("Checkout errors:", errors);
                Swal.fire("Gagal", "Terjadi kesalahan saat memproses pesanan.", "error");
            }
        });
    };

    return {
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
        data,
        setData,
        processing,
        filteredProducts,
        subtotal,
        tax,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        handleCheckout,
        submitPayment,
        paymentInstructions,
        payment_channels,
    };
}
