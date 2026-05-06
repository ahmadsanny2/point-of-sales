import { useState, useMemo, useEffect } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { notify } from "@/Utils/SweetAlert";

/**
 * Custom hook yang mengelola seluruh business logic pada halaman POS.
 * Memisahkan logika dari tampilan (UI) agar lebih mudah dibaca dan diuji.
 *
 * @param {object}  props
 */
export function usePosLogic({ products, cart_items, payment_channels, tax_percent, recent_transactions }) {
    const { flash } = usePage().props;

    // ─── UI State ────────────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [tenderedAmount, setTenderedAmount] = useState("");
    const [showMobileCart, setShowMobileCart] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState(null);

    // Sync categories and search from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('category')) setActiveCategory(params.get('category'));
        if (params.has('search')) setSearchQuery(params.get('search'));
    }, []);

    // ─── Backend Filters ───
    const handleFilterChange = (newCategory, newSearch) => {
        router.get(route('pos.index'), {
            category: newCategory,
            search: newSearch,
            page: 1
        }, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        handleFilterChange(catId, searchQuery);
    };

    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
        handleFilterChange(activeCategory, query);
    };

    const handlePageChange = (pageUrl) => {
        if (!pageUrl) return;
        router.get(pageUrl, {
            category: activeCategory,
            search: searchQuery
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // ─── Cart State (Synchronized with props) ────────────────────────────────
    const [cart, setCart] = useState(cart_items || []);

    // Sync state when props change
    useEffect(() => {
        setCart(cart_items || []);
    }, [cart_items]);

    // ─── Form (Inertia) ───────────────────────────────────────────────────────
    const { data, setData, post, processing } = useForm({
        payment_method: "cash",
        cart: [],
    });

    // ─── Side Effects ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (flash?.tripay_transaction) {
            setPaymentInstructions(flash.tripay_transaction);
            setShowPaymentModal(true);
        }
    }, [flash]);

    useEffect(() => {
        if (!showPaymentModal) {
            setPaymentInstructions(null);
        }
    }, [showPaymentModal]);

    // ─── Derived State ────────────────────────────────────────────────────────
    const filteredProducts = products.data || [];
    const productsPagination = products;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * (tax_percent / 100);
    const total = subtotal + tax;

    // ─── Cart Actions ─────────────────────────────────────────────────────────
    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing && existing.quantity >= product.stock) {
            notify.warning("Stok Terbatas!");
            return;
        }

        router.post(route("pos.cart.add"), { product_id: product.id }, {
            preserveScroll: true
        });
    };

    const updateQuantity = (id, delta) => {
        const item = cart.find((i) => i.id === id);
        if (!item) return;

        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) return;
        if (newQuantity > item.stock) {
            notify.warning("Stok Terbatas!");
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
            return notify.error("Pembayaran Kurang!");
        }

        post(route("pos.checkout"), {
            preserveScroll: true,
            onSuccess: () => {
                if (data.payment_method === "cash") {
                    setShowPaymentModal(false);
                }
            },
            onError: () => {
                notify.error("Terjadi kesalahan saat memproses pesanan.");
            }
        });
    };

    return {
        flash,
        cart,
        activeCategory,
        setActiveCategory: handleCategoryChange,
        searchQuery,
        setSearchQuery,
        handleSearchSubmit,
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
        productsPagination,
        handlePageChange,
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
        tax_percent,
        recent_transactions,
        showHistoryModal,
        setShowHistoryModal,
        openTransactionDetails: (transaction) => {
            if (transaction.payment_details) {
                setPaymentInstructions(transaction.payment_details);
                setData('payment_method', transaction.payment_method);
                setShowHistoryModal(false);
                setShowPaymentModal(true);
            } else {
                notify.info('Transaksi ini sudah selesai atau tidak memerlukan instruksi tambahan.');
            }
        }
    };
}
