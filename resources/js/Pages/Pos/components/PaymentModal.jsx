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
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 backdrop-blur-sm bg-slate-900/60 dark:bg-slate-900/80"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="flex overflow-hidden z-10 flex-col w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all transform dark:bg-slate-800">
                {/* ── Header ── */}
                <div className="flex justify-between items-center p-6 border-b transition-colors border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Pembayaran {paymentMethod.toUpperCase()}
                    </h3>
                    <button
                        onClick={onClose}
                        className="transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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
                <div className="flex-1 p-6 text-center">
                    <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Tagihan
                    </p>
                    <div className="mb-6 text-4xl font-black text-blue-600 dark:text-blue-400">
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
                <div className="flex gap-3 p-4 border-t transition-colors border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 font-bold bg-white rounded-lg border transition-all dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95"
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
            <label className="block mb-2 text-sm font-semibold text-left text-slate-700 dark:text-slate-300">
                Uang Diterima (Rp)
            </label>
            <input
                type="number"
                autoFocus
                value={tenderedAmount}
                onChange={(e) => setTenderedAmount(e.target.value)}
                className="p-4 w-full text-2xl font-bold bg-white rounded-xl border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-0 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                placeholder="0"
            />

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mt-3">
                {QUICK_AMOUNTS.map(({ label, value }) => (
                    <button
                        key={label}
                        onClick={() => setTenderedAmount(value())}
                        className="py-2 text-sm font-medium rounded transition-colors bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Change Calculation */}
            <div
                className={`mt-6 p-4 rounded-xl text-left ${
                    isTendered
                        ? "bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800/50"
                        : "border bg-slate-50 dark:bg-slate-700/50 border-slate-100 dark:border-slate-600"
                }`}
            >
                <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
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
        <div className="py-8 bg-blue-50 rounded-xl border border-blue-100 transition-colors dark:bg-blue-900/20 dark:border-blue-800/50">
            <svg
                className="mx-auto mb-4 w-16 h-16 text-blue-500 dark:text-blue-400"
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
            <p className="px-4 mt-2 text-sm text-blue-600 dark:text-blue-400">
                Pastikan pelanggan telah melakukan scan atau tapping sebelum
                mengonfirmasi.
            </p>
        </div>
    );
}
