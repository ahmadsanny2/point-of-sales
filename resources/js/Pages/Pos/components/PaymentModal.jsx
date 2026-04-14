/**
 * PaymentModal — Modal konfirmasi pembayaran.
 * Mendukung dua mode: TUNAI (dengan input uang & kembalian) dan non-tunai
 * (QRIS / Kartu, menampilkan instruksi scan/tap).
 *
 * Props:
 * @param {boolean}  show             - Apakah modal ditampilkan
 * @param {Function} onClose          - Callback menutup modal
 * @param {string}   paymentMethod    - "cash" | "qris" | "card"
 * @param {number}   total            - Total tagihan
 * @param {string}   tenderedAmount   - Nilai uang yang diterima (state string)
 * @param {Function} setTenderedAmount
 * @param {boolean}  processing       - Status loading form submission
 * @param {Function} onSubmit         - Callback submit pembayaran
 */
export default function PaymentModal({
    show,
    onClose,
    paymentMethod,
    total,
    tenderedAmount,
    setTenderedAmount,
    processing,
    onSubmit,
}) {
    if (!show) return null;

    const change = Number(tenderedAmount) - total;
    const isTendered = Number(tenderedAmount) >= total;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 dark:bg-slate-900/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden flex flex-col transform transition-all">
                {/* ── Header ── */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-between items-center transition-colors">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Pembayaran {paymentMethod.toUpperCase()}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
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

                {/* ── Body ── */}
                <div className="p-6 flex-1 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">
                        Total Tagihan
                    </p>
                    <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-6">
                        Rp {total.toLocaleString("id-ID")}
                    </div>

                    {paymentMethod === "cash" ? (
                        <CashPaymentSection
                            total={total}
                            tenderedAmount={tenderedAmount}
                            setTenderedAmount={setTenderedAmount}
                            change={change}
                            isTendered={isTendered}
                        />
                    ) : (
                        <NonCashPaymentSection paymentMethod={paymentMethod} />
                    )}
                </div>

                {/* ── Footer Actions ── */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex gap-3 transition-colors">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onSubmit}
                        disabled={
                            processing ||
                            (paymentMethod === "cash" && !isTendered)
                        }
                        className="flex-[2] py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {processing ? "Memproses..." : "Selesaikan Pembayaran"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Private Sub-components ───────────────────────────────────────────────────

/**
 * Bagian pembayaran tunai: input nominal, tombol cepat, dan kalkulasi kembalian.
 */
function CashPaymentSection({
    total,
    tenderedAmount,
    setTenderedAmount,
    change,
    isTendered,
}) {
    const QUICK_AMOUNTS = [
        { label: "Pas", value: () => total },
        { label: "50k", value: () => 50000 },
        { label: "100k", value: () => 100000 },
        { label: "+10k", value: () => Number(tenderedAmount) + 10000 },
    ];

    return (
        <div>
            {/* Cash Input */}
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 text-left mb-2">
                Uang Diterima (Rp)
            </label>
            <input
                type="number"
                autoFocus
                value={tenderedAmount}
                onChange={(e) => setTenderedAmount(e.target.value)}
                className="w-full text-2xl font-bold p-4 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-blue-500 focus:ring-0 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                placeholder="0"
            />

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
                {QUICK_AMOUNTS.map(({ label, value }) => (
                    <button
                        key={label}
                        onClick={() => setTenderedAmount(value())}
                        className="py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded font-medium text-slate-700 dark:text-slate-300 text-sm transition-colors"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Change Calculation */}
            <div
                className={`mt-6 p-4 rounded-xl text-left ${
                    isTendered
                        ? "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50"
                        : "bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600"
                }`}
            >
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Uang Kembalian
                </p>
                <p
                    className={`text-2xl font-bold ${
                        isTendered
                            ? "text-green-600 dark:text-green-400"
                            : "text-slate-400 dark:text-slate-500"
                    }`}
                >
                    Rp {isTendered ? change.toLocaleString("id-ID") : "0"}
                </p>
            </div>
        </div>
    );
}

/** Instruksi pembayaran non-tunai (QRIS / Kartu). */
function NonCashPaymentSection({ paymentMethod }) {
    return (
        <div className="py-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl transition-colors">
            <svg
                className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
            </svg>
            <p className="font-semibold text-blue-800 dark:text-blue-300">
                Menunggu Pembayaran {paymentMethod.toUpperCase()}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 px-4">
                Pastikan pelanggan telah melakukan scan atau tapping sebelum
                mengonfirmasi.
            </p>
        </div>
    );
}
