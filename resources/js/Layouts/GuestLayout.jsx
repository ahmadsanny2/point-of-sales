import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import FlashMessages from '@/Components/FlashMessages';

export default function GuestLayout({ children }) {
    const { appSettings } = usePage().props;


    return (
        <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
            <FlashMessages />
            <div>
                <Link href="/" className="flex flex-col items-center">
                    <ApplicationLogo className="w-20 h-20 text-blue-600 fill-current mb-2" />
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                        {appSettings?.store?.name || 'SalePOS'}
                    </h1>
                </Link>
            </div>

            <div className="overflow-hidden px-6 py-4 mt-6 w-full bg-white shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
                {children}
            </div>
        </div>
    );
}
