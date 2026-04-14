import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import useDarkMode from "@/Hooks/useDarkMode";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isDark, toggleTheme] = useDarkMode();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex transition-colors duration-200">

            {user.role === "admin" && (
                <>
                    {/* Sidebar Desktop */}
                    <aside className="hidden w-64 bg-slate-900 flex-col sm:flex transition-all duration-300 shadow-xl">
                        <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-800">
                            <Link href="/" className="flex items-center gap-2">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                                <span className="text-white font-bold text-xl tracking-wider">
                                    POS ADMIN
                                </span>
                            </Link>
                        </div>

                        <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                            <nav className="flex-1 space-y-1.5 px-2">
                                <Link
                                    href={route("dashboard")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("dashboard") ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("dashboard") ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        ></path>
                                    </svg>
                                    Dashboard
                                </Link>

                                <div className="pt-5 pb-2 px-3">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Laporan
                                    </p>
                                </div>
                                <Link
                                    href={route("transactions.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("transactions.*") ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("transactions.*") ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        ></path>
                                    </svg>
                                    Riwayat Transaksi
                                </Link>

                                <div className="pt-5 pb-2 px-3">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Operasional
                                    </p>
                                </div>
                                <Link
                                    href={route("pos.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm border ${route().current("pos.*") ? "bg-blue-600 text-white border-blue-600 shadow-blue-500/30" : "bg-slate-800/50 text-blue-400 hover:bg-blue-600 hover:text-white border-slate-700/50 hover:border-blue-600"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("pos.*") ? "text-white" : "text-blue-400"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        ></path>
                                    </svg>
                                    Buka Mesin Kasir
                                </Link>

                                <div className="pt-5 pb-2 px-3">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Data Master
                                    </p>
                                </div>
                                <Link
                                    href={route("categories.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("categories.*") ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("categories.*") ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        ></path>
                                    </svg>
                                    Kategori Produk
                                </Link>
                                <Link
                                    href={route("products.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("products.*") ? "bg-blue-600 text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("products.*") ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                        ></path>
                                    </svg>
                                    Produk
                                </Link>
                            </nav>
                        </div>
                    </aside>
                </>
            )}


            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 sm:px-6 lg:px-8 shadow-sm z-10 transition-colors duration-200">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none transition-colors"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? "inline-flex"
                                            : "hidden"
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Page Header (if any passed normally in top nav) */}
                    <div className="hidden sm:flex flex-1 items-center">
                        <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100 transition-colors">
                            {header}
                        </h2>
                    </div>

                    {/* Navbar Right */}
                    <div className="flex items-center gap-2">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            title="Toggle Dark Mode"
                        >
                            {isDark ? (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                    ></path>
                                </svg>
                            )}
                        </button>

                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium leading-4 text-slate-600 dark:text-slate-300 transition hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none"
                                        >
                                            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                                            {user.name} ({user.role})
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Mobile Navigation Dropdown */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden bg-slate-900 border-b border-slate-800 text-white relative z-20 shadow-lg"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>
                    <div className="border-t border-slate-800 pb-1 pt-4">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
                    {/* Header in mobile view if needed */}
                    <div className="sm:hidden mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-100">
                            {header}
                        </h2>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
