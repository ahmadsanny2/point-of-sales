import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import useDarkMode from '@/Hooks/useDarkMode';
import FlashMessages from '@/Components/FlashMessages';

export default function PosLayout({ children }) {
    const { auth, appSettings } = usePage().props;
    const user = auth.user;
    const storeName = appSettings?.store?.name || 'POS KASIR';
    const [isDark, toggleTheme] = useDarkMode();

    return (
        <div className="flex overflow-hidden flex-col h-screen min-h-screen transition-colors duration-200 bg-slate-100 dark:bg-slate-900">
            <FlashMessages />
            {/* Top Navigation / Header for Kiosk */}
            <header className="flex relative z-30 justify-between items-center px-4 h-16 bg-white border-b shadow-sm transition-colors duration-200 shrink-0 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="flex gap-4 items-center">
                    <Link href="/" className="flex gap-2 items-center">
                        <ApplicationLogo className="block w-auto h-8 text-blue-600 fill-current dark:text-blue-500" />
                        <span className="text-xl font-bold tracking-tight transition-colors text-slate-800 dark:text-white uppercase">{storeName}</span>
                    </Link>
                    
                    {user.role === 'admin' && (
                        <div className="hidden ml-8 space-x-2 md:flex">
                            <Link href={route('dashboard')} className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700">
                                Kembali ke Admin Dashboard
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex gap-4 items-center">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-colors bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
                        title="Toggle Dark Mode"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        )}
                    </button>

                    <div className="hidden text-right sm:block">
                        <div className="text-sm font-bold transition-colors text-slate-800 dark:text-slate-100">{user.name}</div>
                        <div className="text-xs capitalize transition-colors text-slate-500 dark:text-slate-400">Role: {user.role}</div>
                    </div>
                    
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex justify-center items-center w-10 h-10 rounded-full transition-colors bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-600 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </header>

            {/* Main Content Area - Full screen minus header */}
            <main className="overflow-hidden flex-1">
                {children}
            </main>
        </div>
    );
}
