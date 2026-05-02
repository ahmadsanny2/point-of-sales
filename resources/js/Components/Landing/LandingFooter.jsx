import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

const Logo = () => {
    const { appSettings } = usePage().props;
    const storeName = appSettings?.store?.name || 'SalePOS';
    const showLogo = appSettings?.store?.show_logo === '1' || appSettings?.store?.show_logo === true;
    
    return (
        <div className="flex items-center gap-2.5">
            {showLogo && (
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
                    <ApplicationLogo className="w-6 h-6 text-violet-600 fill-current" />
                </div>
            )}
            <span className="text-lg font-bold text-white uppercase">
                {storeName}
            </span>
        </div>
    );
};

export default function LandingFooter({ auth }) {
    const { appSettings } = usePage().props;
    const landing = appSettings?.landing || {};
    return (
        <footer className="border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-10">
                    {/* Brand column */}
                    <div className="md:col-span-2">
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            {landing.footer_description || 'Sistem point-of-sale modern yang membantu bisnis Indonesia tumbuh lebih cepat dan efisien.'}
                        </p>
                    </div>

                    {/* Product links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-white">Produk</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="#features" className="hover:text-white transition-colors">Fitur</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">Harga</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Account links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4 text-white">Akun</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            {auth?.user ? (
                                <>
                                    <li><Link href={route('dashboard')} className="hover:text-white transition-colors">Dashboard</Link></li>
                                    <li><Link href={route('pos.index')} className="hover:text-white transition-colors">Kasir</Link></li>
                                    <li><Link href={route('profile.edit')} className="hover:text-white transition-colors">Profil</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link href={route('login')} className="hover:text-white transition-colors">Masuk</Link></li>
                                    <li><Link href={route('register')} className="hover:text-white transition-colors">Daftar</Link></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-600 text-xs">
                        {landing.footer_text || `© ${new Date().getFullYear()} SalePOS. All rights reserved.`}
                    </p>
                    <p className="text-slate-700 text-xs">Didukung Laravel + Inertia.js + React</p>
                </div>
            </div>
        </footer>
    );
}
