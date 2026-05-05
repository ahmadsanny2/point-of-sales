import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import useDarkMode from "@/Hooks/useDarkMode";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const { appSettings } = usePage().props;
    const storeName = appSettings?.store?.name || 'POS ADMIN';
    const [isDark, toggleTheme] = useDarkMode();

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);



    return (
        <div className="flex min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-slate-900">

            {user.role === "admin" && (
                <>
                    {/* Sidebar Desktop */}
                    <aside className="hidden flex-col w-64 shadow-xl transition-all duration-300 bg-slate-900 sm:flex">
                        <div className="flex justify-center items-center h-16 border-b shrink-0 border-slate-800">
                            <Link href="/" className="flex gap-2 items-center px-4">
                                <ApplicationLogo className="block w-auto h-8 text-white fill-current shrink-0" />
                                <span className="text-lg font-bold tracking-tight text-white truncate">
                                    {storeName}
                                </span>
                            </Link>
                        </div>

                        <div className="flex overflow-y-auto flex-col flex-1 px-4 py-6">
                            <nav className="flex-1 space-y-1.5 px-2">
                                <Link
                                    href={route("dashboard")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("dashboard") ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
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

                                <div className="px-3 pt-5 pb-2">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Laporan
                                    </p>
                                </div>
                                <Link
                                    href={route("transactions.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("transactions.*") ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
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

                                <div className="px-3 pt-5 pb-2">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Operasional
                                    </p>
                                </div>
                                <Link
                                    href={route("pos.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm border ${route().current("pos.*") ? "bg-primary text-white border-primary shadow-primary/30" : "bg-slate-800/50 text-primary hover:bg-primary hover:text-white border-slate-700/50 hover:border-primary"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("pos.*") ? "text-white" : "text-primary"} transition-colors`}
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

                                <div className="px-3 pt-5 pb-2">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Data Master
                                    </p>
                                </div>
                                <Link
                                    href={route("categories.index")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("categories.*") ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
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
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("products.*") ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
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

                                <div className="px-3 pt-5 pb-2">
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Sistem
                                    </p>
                                </div>
                                <Link
                                    href={route("settings.store")}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium group ${route().current("settings.*") ? "bg-primary text-white shadow-md" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${route().current("settings.*") ? "text-white" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                    Pengaturan CMS
                                </Link>
                            </nav>
                        </div>
                    </aside>
                </>
            )}


            {/* Main Content Area */}
            <div className="flex overflow-hidden flex-col flex-1">
                {/* Top Header */}
                <header className="flex z-10 justify-between items-center px-4 h-16 bg-white border-b shadow-sm transition-colors duration-200 shrink-0 border-slate-200 dark:border-slate-700 dark:bg-slate-800 sm:px-6 lg:px-8">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex justify-center items-center p-2 rounded-md transition-colors text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-500 dark:hover:text-slate-300 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
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
                    <div className="hidden flex-1 items-center sm:flex">
                        <h2 className="text-xl font-semibold leading-tight transition-colors text-slate-800 dark:text-slate-100">
                            {header}
                        </h2>
                    </div>

                    {/* Navbar Right */}
                    <div className="flex gap-2 items-center">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full transition-colors bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
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
                                            className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium leading-4 bg-white rounded-full border transition border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-600"></div>
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

                {/* Mobile Sidebar & Overlay */}
                <div
                    className={`fixed inset-0 z-50 sm:hidden transition-visibility duration-300 ${showingNavigationDropdown ? 'visible' : 'invisible'}`}
                >
                    {/* Backdrop */}
                    <div
                        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${showingNavigationDropdown ? 'opacity-100' : 'opacity-0'}`}
                        onClick={() => setShowingNavigationDropdown(false)}
                    />

                    {/* Sidebar Menu */}
                    <div
                        className={`absolute inset-y-0 left-0 w-72 bg-slate-900 shadow-2xl transition-transform duration-300 transform ${showingNavigationDropdown ? 'translate-x-0' : '-translate-x-full'}`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header Mobile Sidebar */}
                            <div className="flex justify-between items-center px-6 h-16 border-b border-slate-800">
                                <div className="flex gap-2 items-center">
                                    <ApplicationLogo className="w-auto h-7 text-white fill-current" />
                                    <span className="text-base font-bold text-white truncate">{storeName}</span>
                                </div>
                                <button
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="p-2 transition-colors text-slate-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="overflow-y-auto flex-1 px-4 py-6">
                                <nav className="space-y-1">
                                    <ResponsiveNavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Dashboard
                                    </ResponsiveNavLink>

                                    <div className="px-3 pt-5 pb-2">
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Laporan</p>
                                    </div>
                                    <ResponsiveNavLink
                                        href={route("transactions.index")}
                                        active={route().current("transactions.*")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Riwayat Transaksi
                                    </ResponsiveNavLink>

                                    <div className="px-3 pt-5 pb-2">
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Operasional</p>
                                    </div>
                                    <ResponsiveNavLink
                                        href={route("pos.index")}
                                        active={route().current("pos.*")}
                                        className="!bg-primary/10 !text-primary !border-primary"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Buka Mesin Kasir
                                    </ResponsiveNavLink>

                                    <div className="px-3 pt-5 pb-2">
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Data Master</p>
                                    </div>
                                    <ResponsiveNavLink
                                        href={route("categories.index")}
                                        active={route().current("categories.*")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Kategori Produk
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        href={route("products.index")}
                                        active={route().current("products.*")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        Produk
                                    </ResponsiveNavLink>

                                    <div className="px-3 pt-5 pb-2">
                                        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Sistem</p>
                                    </div>
                                    <ResponsiveNavLink
                                        href={route("settings.store")}
                                        active={route().current("settings.*")}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Pengaturan CMS
                                    </ResponsiveNavLink>
                                </nav>
                            </div>

                            {/* User Profile Footer */}
                            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                                <div className="flex gap-3 items-center px-3 py-2 mb-2">
                                    <div className="flex justify-center items-center w-10 h-10 font-bold text-white rounded-full border bg-slate-800 border-slate-700">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                        <p className="text-[10px] font-medium text-slate-500 truncate uppercase tracking-wider">{user.role}</p>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <ResponsiveNavLink href={route("profile.edit")}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </ResponsiveNavLink>
                                    <ResponsiveNavLink
                                        method="post"
                                        href={route("logout")}
                                        as="button"
                                        className="text-red-400 dark:text-red-400 hover:!bg-red-500/10 hover:!text-red-500 hover:!border-red-500"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <main className="overflow-y-auto flex-1 p-4 transition-colors duration-200 sm:p-6 lg:p-10 bg-slate-50 dark:bg-slate-900">
                    {/* Header in mobile view */}
                    <div className="pb-4 mb-6 border-b sm:hidden border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold leading-tight text-slate-800 dark:text-slate-100 uppercase tracking-tight">
                            {header}
                        </h2>
                    </div>
                    
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
