// ── FeatureCard sub-component ─────────────────────────────────────────────────
function FeatureCard({ icon, title, description, gradient, delay }) {
    return (
        <div
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const FEATURES = [
    {
        title: 'Kasir Kilat',
        description: 'Antarmuka kasir yang intuitif, cepat, dan responsif. Proses transaksi dalam hitungan detik tanpa hambatan apapun.',
        gradient: 'from-blue-500 to-cyan-500',
        delay: 0,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
    },
    {
        title: 'Manajemen Produk',
        description: 'Kelola ribuan produk dan kategori dengan mudah. Pembaruan stok real-time dan peringatan stok minimum otomatis.',
        gradient: 'from-emerald-500 to-teal-500',
        delay: 100,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
        ),
    },
    {
        title: 'Payment Gateway',
        description: 'Terima pembayaran via QRIS, transfer bank, kartu kredit, GoPay, OVO, dan dana tunai. Semua dalam satu platform.',
        gradient: 'from-violet-500 to-purple-500',
        delay: 200,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
        ),
    },
    {
        title: 'Laporan & Analitik',
        description: 'Dashboard real-time dengan insight penjualan harian, mingguan, bulanan. Ekspor laporan ke PDF dan Excel.',
        gradient: 'from-orange-500 to-amber-500',
        delay: 300,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
    },
    {
        title: 'Multi Kasir & Shift',
        description: 'Kelola beberapa kasir sekaligus dengan sistem shift terintegrasi. Kontrol akses berbasis peran yang fleksibel.',
        gradient: 'from-rose-500 to-pink-500',
        delay: 400,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        title: 'Dark Mode Native',
        description: 'Desain yang nyaman digunakan siang dan malam. Mata kasir Anda akan berterima kasih setelah shift panjang.',
        gradient: 'from-slate-500 to-slate-600',
        delay: 500,
        icon: (
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ),
    },
];

// ── Section ────────────────────────────────────────────────────────────────────
export default function FeaturesSection() {
    return (
        <section id="features" className="py-28 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">Fitur Unggulan</span>
                    <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Semua yang Bisnis Anda Butuhkan</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Dirancang untuk kemudahan operasional sehari-hari, dari transaksi hingga laporan keuangan lengkap.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
