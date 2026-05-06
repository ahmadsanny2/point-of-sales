import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const baseConfig = () => ({
    background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
});

export const notify = {
    success: (title, text = '') => {
        Swal.fire({
            ...baseConfig(),
            icon: 'success',
            title: title,
            text: text,
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: 'OK',
        });
    },
    error: (title, text = '') => {
        Swal.fire({
            ...baseConfig(),
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: 'Tutup',
        });
    },
    warning: (title, text = '') => {
        Swal.fire({
            ...baseConfig(),
            icon: 'warning',
            title: title,
            text: text,
            confirmButtonText: 'Mengerti',
        });
    },
    info: (title, text = '') => {
        Swal.fire({
            ...baseConfig(),
            icon: 'info',
            title: title,
            text: text,
            confirmButtonText: 'OK',
        });
    },
    confirm: async (title, text, confirmButtonText = 'Ya, Lanjutkan!') => {
        return await Swal.fire({
            ...baseConfig(),
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Batal',
        });
    }
};

export default Swal;
