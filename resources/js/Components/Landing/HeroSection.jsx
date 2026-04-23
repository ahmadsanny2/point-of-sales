import { Link, usePage } from "@inertiajs/react";

export default function HeroSection({ auth }) {
    const { appSettings } = usePage().props;
    const landing = appSettings?.landing || {};
    const mockStats = [
        {
            label: "Produk",
            val: "248",
            color: "from-blue-500/20 to-cyan-500/20",
            border: "border-blue-500/20",
        },
        {
            label: "Transaksi",
            val: "64",
            color: "from-emerald-500/20 to-teal-500/20",
            border: "border-emerald-500/20",
        },
        {
            label: "Omset",
            val: "Rp 8.4jt",
            color: "from-violet-500/20 to-purple-500/20",
            border: "border-violet-500/20",
        },
        {
            label: "Stok Tipis",
            val: "3",
            color: "from-amber-500/20 to-orange-500/20",
            border: "border-amber-500/20",
        },
    ];

    const mockTransactions = [
        "INV-001 · Rp 45.000",
        "INV-002 · Rp 120.000",
        "INV-003 · Rp 87.500",
    ];

    return (
        <section className="relative flex items-center justify-center min-h-screen px-6 pt-24 overflow-hidden">
            {/* Background ambient glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[100px] animate-pulse"
                    style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/8 rounded-full blur-[140px]" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
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
                <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight md:text-7xl">
                    {landing.hero_title || 'Kasir Cerdas untuk Bisnis Modern'}
                </h1>

                <p className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed md:text-xl text-slate-400">
                    {landing.hero_subtitle || 'Kelola transaksi, produk, dan laporan keuangan bisnis Anda dalam satu platform yang elegan. Dari warung kecil hingga jaringan ritel besar.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    {auth?.user ? (
                        <Link
                            href={
                                auth?.user.role === "admin"
                                    ? route("dashboard")
                                    : route("pos.index")
                            }
                            className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 shadow-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-2xl shadow-violet-500/40 hover:-translate-y-1 hover:shadow-violet-500/60"
                        >
                            {auth?.user.role === "admin"
                                ? "Buka Dashboard →"
                                : "Masuk →"}
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("register")}
                                className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 shadow-2xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 rounded-2xl shadow-violet-500/40 hover:-translate-y-1 hover:shadow-violet-500/60"
                            >
                                {landing.cta_text || 'Mulai Gratis — Sekarang'}
                            </Link>
                            <Link
                                href={route("login")}
                                className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 border bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 rounded-2xl"
                            >
                                Sudah punya akun?
                            </Link>
                        </>
                    )}
                </div>

                {/* Trust signals */}
                <p className="mt-6 text-xs text-slate-500">
                    ✓ Tidak perlu kartu kredit &nbsp;·&nbsp; ✓ Setup dalam 2
                    menit &nbsp;·&nbsp; ✓ Gratis untuk selama-lamanya
                </p>

                {/* Mock Dashboard Preview */}
                <div className="relative mt-16">
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent z-10 pointer-events-none"
                        style={{ top: "60%" }}
                    />
                    <div className="max-w-4xl p-6 mx-auto overflow-hidden border shadow-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-white/10 rounded-2xl">
                        {/* Fake browser chrome */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-rose-500" />
                            <div className="w-3 h-3 rounded-full bg-amber-500" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500" />
                            <div className="flex-1 h-6 mx-4 rounded-lg bg-slate-700/60" />
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {mockStats.map((s) => (
                                <div
                                    key={s.label}
                                    className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-xl p-3`}
                                >
                                    <div className="mb-1 text-xs text-slate-400">
                                        {s.label}
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                        {s.val}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Transactions list */}
                        <div className="p-4 space-y-2 bg-slate-800/50 rounded-xl">
                            {mockTransactions.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-700/40"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center rounded-lg w-7 h-7 bg-violet-500/20">
                                            <div className="w-2 h-2 rounded-full bg-violet-400" />
                                        </div>
                                        <span className="font-mono text-xs text-slate-300">
                                            {t}
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-400">
                                        ✓ Lunas
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
