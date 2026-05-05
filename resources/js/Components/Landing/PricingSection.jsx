// ── PricingCard sub-component ─────────────────────────────────────────────────
function PricingCard({ plan, price, features, highlighted, badge }) {
    return (
        <div className={`relative rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${
            highlighted
                ? 'bg-gradient-to-b from-violet-600 to-purple-700 border-violet-400/50 shadow-2xl shadow-violet-500/30'
                : 'bg-white/5 border-white/10 hover:border-white/30'
        }`}>
            {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap">
                    {badge}
                </div>
            )}

            <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${highlighted ? 'text-violet-200' : 'text-slate-400'}`}>
                {plan}
            </p>

            <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black text-white">{price}</span>
                {price !== 'Gratis' && (
                    <span className={`text-sm mb-1.5 ${highlighted ? 'text-violet-200' : 'text-slate-400'}`}>/bulan</span>
                )}
            </div>

            <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                        <svg
                            className={`w-4 h-4 flex-shrink-0 ${highlighted ? 'text-violet-200' : 'text-emerald-400'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className={highlighted ? 'text-violet-100' : 'text-slate-300'}>{feature}</span>
                    </li>
                ))}
            </ul>

            <a
                href={route('register')}
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    highlighted
                        ? 'bg-white text-violet-700 hover:bg-violet-50 shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
            >
                Mulai Sekarang
            </a>
        </div>
    );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PLANS = [
    {
        plan: 'Starter',
        price: 'Gratis',
        features: ['1 kasir', 'Hingga 50 produk', 'Laporan dasar', 'Pembayaran tunai', 'Support email'],
    },
    {
        plan: 'Bisnis',
        price: 'Rp 199rb',
        features: ['5 kasir', 'Produk tak terbatas', 'Analitik lanjutan', 'Semua metode bayar', 'Multi cabang', 'Priority support'],
        highlighted: true,
        badge: '⭐ Terpopuler',
    },
    {
        plan: 'Enterprise',
        price: 'Rp 499rb',
        features: ['Kasir tak terbatas', 'API akses penuh', 'Custom branding', 'Dedicated server', 'SLA 99.9%', 'Onboarding khusus'],
    },
];

import { usePage } from "@inertiajs/react";

// ── Section ────────────────────────────────────────────────────────────────────
export default function PricingSection() {
    const { appSettings } = usePage().props;
    const landing = appSettings?.landing || {};

    return (
        <section id="pricing" className="py-28 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto relative">
                <div className="text-center mb-16">
                    <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">{landing.pricing_title || 'Harga Terjangkau'}</span>
                    <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">{landing.pricing_subtitle || 'Harga Transparan, Tanpa Kejutan'}</h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        {landing.pricing_description || 'Tanpa biaya tersembunyi. Bayar sesuai kebutuhan bisnis Anda.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 items-center">
                    {PLANS.map((plan) => (
                        <PricingCard key={plan.plan} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
}
