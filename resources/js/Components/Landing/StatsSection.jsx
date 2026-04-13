import AnimatedCounter from '@/Components/Landing/AnimatedCounter';

const STATS = [
    { value: 500, suffix: '+', label: 'Bisnis Aktif' },
    { value: 1200000, suffix: '+', label: 'Transaksi Diproses' },
    { value: 99, suffix: '.9%', label: 'Uptime Dijamin' },
    { value: 24, suffix: '/7', label: 'Dukungan Tim' },
];

export default function StatsSection() {
    return (
        <section id="stats" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-violet-900/30" />
            <div className="absolute inset-0 border-y border-white/5" />

            <div className="relative max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
                {STATS.map((stat) => (
                    <div key={stat.label}>
                        <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                        </div>
                        <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
