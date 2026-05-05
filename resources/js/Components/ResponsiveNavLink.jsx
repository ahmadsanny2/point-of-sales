import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-center gap-3 border-l-4 py-3 pe-4 ps-3 ${
                active
                    ? 'border-primary bg-primary/10 text-primary dark:border-primary dark:bg-primary/20 dark:text-primary'
                    : 'border-transparent text-slate-400 hover:border-slate-600 hover:bg-slate-800 hover:text-slate-200'
            } text-sm font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
