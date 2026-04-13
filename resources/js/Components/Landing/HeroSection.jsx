import { Link } from '@inertiajs/react';

export default function HeroSection({ auth }) {
    const mockStats = [
        { label: 'Produk', val: '248', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20' },
        { label: 'Transaksi', val: '64', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/20' },
        { label: 'Omset', val: 'Rp 8.4jt', color: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/20' },
        { label: 'Stok Tipis', val: '3', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/20' },
    ];

    const mockTransactions = [
        'INV-001 · Rp 45.000',
        'INV-002 · Rp 120.000',
        'INV-003 · Rp 87.500',
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
            {/* Background ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[140px]" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8 text-sm text-violet-300">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Sistem POS Terpercaya #1 di Indonesia
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6">
                    Kasir Cerdas untuk{' '}
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Bisnis Modern
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Kelola transaksi, produk, dan laporan keuangan bisnis Anda dalam satu platform yang elegan.
                    Dari warung kecil hingga jaringan ritel besar.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/60"
                        >
                            Buka Dashboard →
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('register')}
                                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-violet-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-violet-500/60"
                            >
                                Mulai Gratis — Sekarang
                            </Link>
                            <Link
                                href={route('login')}
                                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white rounded-2xl font-semibold text-lg transition-all duration-300"
                            >
                                Sudah punya akun?
                            </Link>
                        </>
                    )}
                </div>

                {/* Trust signals */}
                <p className="mt-6 text-xs text-slate-500">
                    ✓ Tidak perlu kartu kredit &nbsp;·&nbsp; ✓ Setup dalam 2 menit &nbsp;·&nbsp; ✓ Gratis untuk selama-lamanya
                </p>

                {/* Mock Dashboard Preview */}
                <div className="mt-16 relative">
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent z-10 pointer-events-none"
                        style={{ top: '60%' }}
                    />
                    <div className="bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto overflow-hidden">
                        {/* Fake browser chrome */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <div className="flex-1 mx-4 h-6 bg-slate-700/60 rounded-lg" />
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {mockStats.map((s) => (
                                <div key={s.label} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-xl p-3`}>
                                    <div className="text-xs text-slate-400 mb-1">{s.label}</div>
                                    <div className="text-lg font-bold text-white">{s.val}</div>
                                </div>
                            ))}
                        </div>

                        {/* Transactions list */}
                        <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
                            {mockTransactions.map((t, i) => (
                                <div key={i} className="flex items-center justify-between bg-slate-700/40 rounded-lg px-3 py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-violet-400 rounded-full" />
                                        </div>
                                        <span className="text-xs text-slate-300 font-mono">{t}</span>
                                    </div>
                                    <span className="text-xs text-emerald-400 font-semibold">✓ Lunas</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
