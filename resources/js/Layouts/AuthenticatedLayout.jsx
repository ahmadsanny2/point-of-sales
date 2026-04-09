import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden w-64 bg-slate-900 flex-col sm:flex transition-all duration-300 shadow-xl">
                <div className="flex h-16 shrink-0 items-center justify-center border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-white" />
                        <span className="text-white font-bold text-xl tracking-wider">POS ADMIN</span>
                    </Link>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
                    <nav className="flex-1 space-y-2">
                        <NavLink href={route('dashboard')} active={route().current('dashboard')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Dashboard
                        </NavLink>
                        
                        <div className="pt-4 pb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Laporan</p>
                        </div>
                        <NavLink href={route('transactions.index')} active={route().current('transactions.*')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Riwayat Transaksi
                        </NavLink>

                        <div className="pt-4 pb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Operasional</p>
                        </div>
                        <NavLink href={route('pos.index')} active={route().current('pos.*')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors font-medium border border-blue-600/20">
                            Buka Mesin Kasir
                        </NavLink>

                        <div className="pt-4 pb-2">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Master</p>
                        </div>
                        <NavLink href={route('categories.index')} active={route().current('categories.*')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Kategori Produk
                        </NavLink>
                        <NavLink href={route('products.index')} active={route().current('products.*')} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                            Produk
                        </NavLink>
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Header */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8 shadow-sm z-10">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Page Header (if any passed normally in top nav) */}
                    <div className="hidden sm:flex flex-1 items-center">
                        <h2 className="text-xl font-semibold leading-tight text-slate-800">{header}</h2>
                    </div>

                    {/* Navbar Right */}
                    <div className="flex items-center">
                        <div className="relative ms-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium leading-4 text-slate-600 transition hover:text-slate-800 hover:shadow-md hover:bg-slate-50 focus:outline-none">
                                            <div className="h-6 w-6 rounded-full bg-slate-200"></div>
                                            {user.name} ({user.role})
                                            <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </header>

                {/* Mobile Navigation Dropdown */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-slate-900 text-white relative z-20 shadow-lg'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>
                    </div>
                    <div className="border-t border-slate-700 pb-1 pt-4">
                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">Log Out</ResponsiveNavLink>
                        </div>
                    </div>
                </div>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    {/* Header in mobile view if needed */}
                    <div className="sm:hidden mb-4 pb-2 border-b border-slate-200">
                         <h2 className="text-xl font-semibold leading-tight text-slate-800">{header}</h2>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
