import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import useDarkMode from '@/Hooks/useDarkMode';

export default function PosLayout({ children }) {
    const user = usePage().props.auth.user;
    const [isDark, toggleTheme] = useDarkMode();

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col overflow-hidden h-screen transition-colors duration-200">
            {/* Top Navigation / Header for Kiosk */}
            <header className="flex h-16 shrink-0 items-center justify-between bg-white dark:bg-slate-800 px-4 shadow-sm z-30 relative border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-blue-600 dark:text-blue-500" />
                        <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight transition-colors">KASIR POS</span>
                    </Link>
                    
                    {user.role === 'admin' && (
                        <div className="hidden md:flex ml-8 space-x-2">
                            <Link href={route('dashboard')} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                Kembali ke Admin Dashboard
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                        title="Toggle Dark Mode"
                    >
                        {isDark ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                        )}
                    </button>

                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-800 dark:text-slate-100 transition-colors">{user.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 capitalize transition-colors">Role: {user.role}</div>
                    </div>
                    
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor">
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
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}
