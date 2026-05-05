import { Link, usePage } from '@inertiajs/react';

export default function CtaBanner({ auth }) {
    const { appSettings } = usePage().props;
    const landing = appSettings?.landing || {};

    return (
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center overflow-hidden shadow-2xl shadow-violet-500/30">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-800/40 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">{landing.cta_banner_title || 'Siap Tingkatkan Bisnis Anda?'}</h2>
                        <p className="text-violet-100 text-lg mb-8 max-w-xl mx-auto">
                            {landing.cta_banner_subtitle || 'Bergabung dengan ribuan pebisnis yang sudah menggunakan SalePOS. Coba gratis 30 hari, tidak perlu kartu kredit.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth?.user ? (
                                <Link
                                    href={route('pos.index')}
                                    className="px-8 py-4 bg-white text-violet-700 rounded-2xl font-bold text-lg hover:bg-violet-50 transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
                                >
                                    Buka Halaman Kasir →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-white text-violet-700 rounded-2xl font-bold text-lg hover:bg-violet-50 transition-all duration-300 hover:-translate-y-0.5 shadow-xl"
                                    >
                                        {landing.cta_banner_primary_text || 'Daftar Gratis Sekarang'}
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="px-8 py-4 bg-violet-500/30 hover:bg-violet-500/50 text-white rounded-2xl font-semibold text-lg transition-all duration-300 border border-violet-400/30"
                                    >
                                        {landing.cta_banner_secondary_text || 'Sudah Punya Akun'}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
