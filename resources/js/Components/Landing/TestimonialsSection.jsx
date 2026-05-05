import { usePage } from '@inertiajs/react';

const TESTIMONIALS = [
    {
        name: 'Budi Santoso',
        role: 'Pemilik Warung Makan Barokah',
        content: 'Sejak pakai SalePOS, omset naik 30%! Laporan keuangan jadi super mudah dan tidak perlu catat manual lagi.',
        avatar: 'BS',
        color: 'from-blue-500 to-indigo-500',
    },
    {
        name: 'Siti Rahayu',
        role: 'Manager Toko Elektronik MakmurJaya',
        content: 'Manajemen stok 500+ produk jadi sangat gampang. Payment gateway Midtrans-nya bekerja mulus tanpa kendala.',
        avatar: 'SR',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        name: 'Ahmad Fauzi',
        role: 'Founder Kedai Kopi Ngopi Yuk',
        content: 'Tampilan dark mode-nya keren banget. Kasir saya senang karena mata tidak lelah saat shift malam.',
        avatar: 'AF',
        color: 'from-violet-500 to-purple-500',
    },
];

export default function TestimonialsSection() {
    const { appSettings } = usePage().props;
    const landing = appSettings.landing || {};

    return (
        <section id="testimonials" className="py-28 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">
                        {landing.testimonials_title || 'Kata Mereka'}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">
                        {landing.testimonials_subtitle || 'Dipercaya Ribuan Pebisnis'}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t) => (
                        <div
                            key={t.name}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Star rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{t.content}"</p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-bold flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-white">{t.name}</p>
                                    <p className="text-xs text-slate-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
