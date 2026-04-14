/**
 * CartPanel — Panel keranjang belanja di sisi kanan (dan overlay mobile).
 *
 * Props:
 * @param {Array}    cart              - Item yang ada di keranjang
 * @param {object}   data              - Form data (payment_method)
 * @param {Function} setData           - Setter form Inertia
 * @param {boolean}  processing        - Status loading form submission
 * @param {number}   subtotal
 * @param {number}   tax
 * @param {number}   total
 * @param {boolean}  showMobileCart    - Apakah cart overlay mobile ditampilkan
 * @param {Function} setShowMobileCart
 * @param {Function} updateQuantity    - Callback ubah qty item
 * @param {Function} removeFromCart    - Callback hapus item
 * @param {Function} handleCheckout    - Callback buka modal pembayaran
 */
export default function CartPanel({
    cart,
    data,
    setData,
    processing,
    subtotal,
    tax,
    total,
    showMobileCart,
    setShowMobileCart,
    updateQuantity,
    removeFromCart,
    handleCheckout,
}) {
    return (
        <>
            {/* Mobile Backdrop */}
            {showMobileCart && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-900/50 z-30"
                    onClick={() => setShowMobileCart(false)}
                />
            )}

            {/* Cart Panel */}
            <div
                className={`${
                    showMobileCart
                        ? "fixed inset-y-0 right-0 w-80 flex shadow-2xl z-40"
                        : "hidden"
                } lg:flex lg:relative lg:w-1/3 xl:w-1/4 flex-col h-full bg-white dark:bg-slate-800 lg:shadow-xl dark:shadow-none lg:border-l lg:border-slate-200 dark:border-slate-700 lg:z-20 transition-all`}
            >
                {/* ── Header ── */}
                <CartHeader onClose={() => setShowMobileCart(false)} />

                {/* ── Item List ── */}
                <div className="flex-1 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-900 transition-colors">
                    {cart.length === 0 ? (
                        <EmptyCartState />
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Summary & Actions ── */}
                <CartFooter
                    cart={cart}
                    data={data}
                    setData={setData}
                    processing={processing}
                    subtotal={subtotal}
                    tax={tax}
                    total={total}
                    onCheckout={handleCheckout}
                />
            </div>
        </>
    );
}

// ─── Private Sub-components ───────────────────────────────────────────────────

/** Header panel keranjang dengan judul dan tombol tutup (mobile). */
function CartHeader({ onClose }) {
    return (
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-800 dark:bg-slate-900 text-white shrink-0 flex justify-between items-center transition-colors">
            <h2 className="text-lg font-semibold flex items-center gap-2">
                <svg
                    className="w-5 h-5 text-blue-400"
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
                Struk Pesanan
            </h2>
            <button
                onClick={onClose}
                className="lg:hidden text-slate-300 hover:text-white"
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
}

/** Pesan ketika keranjang masih kosong. */
function EmptyCartState() {
    return (
        <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
            <p>Keranjang masih kosong</p>
            <p className="text-sm mt-1 text-slate-300 dark:text-slate-600">
                Pilih menu untuk menambahkan
            </p>
        </div>
    );
}

/** Satu baris item di dalam keranjang. */
function CartItem({ item, onUpdateQuantity, onRemove }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 relative group transition-colors">
            {/* Name & Price */}
            <div className="flex justify-between items-start mb-2">
                <div className="pr-6">
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                        {item.name}
                    </h4>
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                    </div>
                </div>
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 absolute top-3 right-3 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Quantity Controls & Subtotal */}
            <div className="flex justify-between items-center">
                <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600">
                    <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-600 rounded shadow-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
                    >
                        -
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-slate-800 dark:text-slate-100">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-600 rounded shadow-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 active:scale-95 transition-all"
                    >
                        +
                    </button>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-100">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </div>
            </div>
        </div>
    );
}

/**
 * Footer keranjang: ringkasan harga, pilihan metode pembayaran,
 * dan tombol checkout.
 */
function CartFooter({ cart, data, setData, processing, subtotal, tax, total, onCheckout }) {
    const PAYMENT_METHODS = [
        { value: "cash", label: "TUNAI" },
        { value: "qris", label: "QRIS" },
        { value: "card", label: "KARTU" },
    ];

    return (
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors">
            {/* Price Summary */}
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>PPN (11%)</span>
                    <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <span>Total Tagihan</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
            </div>

            {/* Payment Method Selector */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Metode Pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {PAYMENT_METHODS.map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => setData("payment_method", value)}
                            className={`py-2 px-1 text-sm font-medium rounded-md border transition-all ${
                                data.payment_method === value
                                    ? "bg-blue-50 dark:bg-blue-900/30 border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400"
                                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Checkout Button */}
            <button
                onClick={onCheckout}
                disabled={cart.length === 0 || processing}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg border border-blue-700 dark:border-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {processing ? (
                    <span>Memproses...</span>
                ) : (
                    <>
                        <span>BAYAR SEKARANG</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </>
                )}
            </button>
        </div>
    );
}
