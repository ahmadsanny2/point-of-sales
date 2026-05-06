import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { notify } from '@/Utils/SweetAlert';

export default function FlashMessages() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.message) {
            notify.success(flash.message);
        }

        if (flash.error) {
            notify.error(flash.error);
        }
    }, [flash]);

    return null;
}
