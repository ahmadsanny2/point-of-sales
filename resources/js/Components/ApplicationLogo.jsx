import { usePage } from '@inertiajs/react';

export default function ApplicationLogo({ forceShow = false, ...props }) {
    const { appSettings } = usePage().props;
    const logoPath = appSettings?.store?.logo_path;
    const showLogo = forceShow || appSettings?.store?.show_logo === '1' || appSettings?.store?.show_logo === true;

    if (!showLogo) {
        return null;
    }

    if (logoPath) {
        return (
            <img 
                src={`/storage/${logoPath}`} 
                alt="Logo" 
                className={props.className} 
                style={{ objectFit: 'contain' }}
            />
        );
    }

    // Default Fallback Logo (Laravel SVG Icon)
    return (
        <svg
            {...props}
            viewBox="0 0 262 266"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M130.517 0.147101L0.739394 14.2822V50.7178L130.517 64.8529L261.261 50.7178V14.2822L130.517 0.147101Z"
                fill="#FF2D20"
            />
            <path
                d="M130.517 64.8529V265.853L261.261 201.718V50.7178L130.517 64.8529Z"
                fill="#FF2D20"
                fillOpacity="0.8"
            />
            <path
                d="M130.517 64.8529L0.739394 50.7178V201.718L130.517 265.853V64.8529Z"
                fill="#FF2D20"
                fillOpacity="0.9"
            />
        </svg>
    );
}
