import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({ auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { appSettings } = usePage().props;
    const store = appSettings?.store || {};
    const receipt = appSettings?.receipt || {};

    return (
        <nav
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0f1e]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" : ""}`}
        >
            <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2.5 group">
                    {receipt.show_logo === '1' && store.logo_path ? (
                        <div className="flex items-center justify-center transition-transform shadow-lg w-9 h-9 overflow-hidden rounded-xl bg-white group-hover:scale-105">
                            <img src={`/storage/${store.logo_path}`} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center transition-transform shadow-lg w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 group-hover:scale-105">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <span className="text-lg font-bold tracking-tight">
                        {store.name || 'SalePOS'}
                    </span>
                </a>

                {/* Desktop Nav Links */}
                <div className="items-center hidden gap-8 text-sm md:flex text-slate-300">
                    <a
                        href="#features"
                        className="transition-colors hover:text-white"
                    >
                        Fitur
                    </a>
                    <a
                        href="#stats"
                        className="transition-colors hover:text-white"
                    >
                        Statistik
                    </a>
                    <a
                        href="#pricing"
                        className="transition-colors hover:text-white"
                    >
                        Harga
                    </a>
                    <a
                        href="#testimonials"
                        className="transition-colors hover:text-white"
                    >
                        Testimoni
                    </a>
                </div>

                {/* Desktop CTA */}
                <div className="items-center hidden gap-3 md:flex">
                    {auth?.user ? (
                        <Link
                            href={
                                auth?.user?.role === "admin"
                                    ? route("dashboard")
                                    : route("pos.index")
                            }
                            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            {auth?.user?.role === "admin"
                                ? "Buka Dashboard →"
                                : "Masuk →"}
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="px-4 py-2 text-sm transition-colors text-slate-300 hover:text-white"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Coba Gratis
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="p-2 md:hidden text-slate-400 hover:text-white"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {mobileOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-80" : "max-h-0"}`}
            >
                <div className="px-6 pb-6 flex flex-col gap-4 bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/10">
                    <a
                        href="#features"
                        className="text-sm text-slate-300 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        Fitur
                    </a>
                    <a
                        href="#stats"
                        className="text-sm text-slate-300 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        Statistik
                    </a>
                    <a
                        href="#pricing"
                        className="text-sm text-slate-300 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        Harga
                    </a>
                    <a
                        href="#testimonials"
                        className="text-sm text-slate-300 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        Testimoni
                    </a>
                    <div className="flex gap-3 pt-2">
                        {auth?.user ? (
                            <Link
                                href={route("dashboard")}
                                className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-sm"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="flex-1 text-center px-4 py-2.5 border border-white/20 text-white rounded-xl text-sm"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold text-sm"
                                >
                                    Coba Gratis
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
