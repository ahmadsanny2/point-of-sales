import { Link } from '@inertiajs/react';

const Logo = () => (
    <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        </div>
        <span className="text-lg font-bold">
            Sale<span className="text-violet-400">POS</span>
        </span>
    </div>
);

export default function LandingFooter({ auth }) {
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
                            Sistem point-of-sale modern yang membantu bisnis Indonesia tumbuh lebih cepat dan efisien.
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
                    <p className="text-slate-600 text-xs">© 2026 SalePOS. Dibuat dengan ❤️ di Indonesia.</p>
                    <p className="text-slate-700 text-xs">Didukung Laravel + Inertia.js + React</p>
                </div>
            </div>
        </footer>
    );
}
