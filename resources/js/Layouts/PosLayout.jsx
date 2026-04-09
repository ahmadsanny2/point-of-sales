import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function PosLayout({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col overflow-hidden h-screen">
            {/* Top Navigation / Header for Kiosk */}
            <header className="flex h-16 shrink-0 items-center justify-between bg-white px-4 shadow-sm z-30 relative border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <ApplicationLogo className="block h-8 w-auto fill-current text-blue-600" />
                        <span className="font-bold text-xl text-slate-800 tracking-tight">KASIR POS</span>
                    </Link>
                    
                    {user.role === 'admin' && (
                        <div className="hidden md:flex ml-8 space-x-2">
                            <Link href={route('dashboard')} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                                Kembali ke Admin Dashboard
                            </Link>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-500 capitalize">Role: {user.role}</div>
                    </div>
                    
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
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
