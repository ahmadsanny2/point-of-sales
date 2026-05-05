import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from '../Partials/SettingsTabs';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

export default function UserIndex({ auth, users }) {
    const { delete: destroy } = useForm();

    const handleDelete = (user) => {
        if (user.id === auth.user.id) {
            Swal.fire('Error', 'Anda tidak bisa menghapus akun sendiri!', 'error');
            return;
        }

        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Akun ${user.name} akan dihapus permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#6B7280',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('settings.users.destroy', user.id), {
                    onSuccess: () => Swal.fire('Berhasil!', 'User telah dihapus.', 'success'),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Manajemen Pengguna"
        >
            <Head title="Manajemen Pengguna" />

            <div className="space-y-6">
                <div className="px-4 sm:px-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Manajemen Pengguna</h3>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Atur hak akses dan kelola akun staff atau administrator Anda.
                            </p>
                        </div>
                        <Link href={route('settings.users.create')}>
                            <PrimaryButton className="bg-blue-600 hover:bg-blue-700">
                                + Tambah User Baru
                            </PrimaryButton>
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                        <div className="p-6 pb-0">
                            <SettingsTabs active="users" />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-900/50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Informasi User</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Role</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Terdaftar</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-600">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ms-4">
                                                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-400">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-lg ${
                                                    user.role === 'admin' 
                                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' 
                                                        : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                                }`}>
                                                    {user.role === 'admin' ? 'ADMIN' : 'STAFF'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`h-1.5 w-1.5 rounded-full me-2 ${user.is_active ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                                    <span className={`text-xs font-semibold ${user.is_active ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                                                        {user.is_active ? 'Aktif' : 'Non-aktif'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                                                {dayjs(user.created_at).format('DD MMM YYYY')}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold space-x-3">
                                                <Link 
                                                    href={route('settings.users.edit', user.id)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user)}
                                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
