import { Head } from "@inertiajs/react";
import PosLayout from "@/Layouts/PosLayout";

import { usePosLogic } from "./hooks/usePosLogic";
import ProductGrid from "./components/ProductGrid";
import CartPanel from "./components/CartPanel";
import PaymentModal from "./components/PaymentModal";

/**
 * Halaman utama POS (Kasir Kiosk).
 *
 * Seluruh business logic dikelola oleh `usePosLogic`.
 * Komponen ini hanya bertugas merakit tampilan dari sub-komponen.
 */
export default function Index({ categories, products, midtrans_client_key, is_production }) {
    const pos = usePosLogic({ products, midtrans_client_key, is_production });

    return (
        <PosLayout>
            <Head title="Kasir Kiosk" />

            <div className="flex h-full w-full relative">
                {/* ── Kiri: Grid Produk (70%) ── */}
                <ProductGrid
                    categories={categories}
                    filteredProducts={pos.filteredProducts}
                    activeCategory={pos.activeCategory}
                    setActiveCategory={pos.setActiveCategory}
                    searchQuery={pos.searchQuery}
                    setSearchQuery={pos.setSearchQuery}
                    flash={pos.flash}
                    addToCart={pos.addToCart}
                />

                {/* ── Kanan: Panel Keranjang (30%) ── */}
                <CartPanel
                    cart={pos.cart}
                    data={pos.data}
                    setData={pos.setData}
                    processing={pos.processing}
                    subtotal={pos.subtotal}
                    tax={pos.tax}
                    total={pos.total}
                    showMobileCart={pos.showMobileCart}
                    setShowMobileCart={pos.setShowMobileCart}
                    updateQuantity={pos.updateQuantity}
                    removeFromCart={pos.removeFromCart}
                    handleCheckout={pos.handleCheckout}
                />

                {/* ── Mobile: Tombol Buka Keranjang ── */}
                <MobileCartButton
                    cartCount={pos.cart.length}
                    showMobileCart={pos.showMobileCart}
                    onOpen={() => pos.setShowMobileCart(true)}
                />
            </div>

            {/* ── Modal Pembayaran ── */}
            <PaymentModal
                show={pos.showPaymentModal}
                onClose={() => pos.setShowPaymentModal(false)}
                paymentMethod={pos.data.payment_method}
                total={pos.total}
                tenderedAmount={pos.tenderedAmount}
                setTenderedAmount={pos.setTenderedAmount}
                processing={pos.processing}
                onSubmit={pos.submitPayment}
            />
        </PosLayout>
    );
}

// ─── Local Component ──────────────────────────────────────────────────────────

/**
 * Tombol floating di mobile untuk membuka panel keranjang.
 * Disembunyikan ketika panel sudah terbuka.
 */
function MobileCartButton({ cartCount, showMobileCart, onOpen }) {
    return (
        <div
            className={`lg:hidden absolute bottom-4 right-4 z-20 transition-all duration-300 ${
                showMobileCart ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        >
            <button
                onClick={onOpen}
                className="bg-blue-600 dark:bg-blue-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative hover:bg-blue-700 dark:hover:bg-blue-600 active:scale-95 transition-all"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800">
                        {cartCount}
                    </span>
                )}
            </button>
        </div>
    );
}
