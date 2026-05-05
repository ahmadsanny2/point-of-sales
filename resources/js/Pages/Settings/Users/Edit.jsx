import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Checkbox from '@/Components/Checkbox';
import { Transition } from '@headlessui/react';

export default function UserEdit({ auth, user }) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        is_active: user.is_active === 1 || user.is_active === true,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('settings.users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={`Edit Pengguna: ${user.name}`}
        >
            <Head title={`Edit User ${user.name}`} />

            <div className="space-y-6">
                <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Manajemen Pengguna</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Perbarui informasi profil, peran, dan status akses akun pengguna.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Profil Utama */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Informasi Profil</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Data dasar identitas pengguna dalam sistem.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Lengkap" className="dark:text-slate-300" />
                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Nama lengkap pengguna"
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Alamat Email" className="dark:text-slate-300" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="email@contoh.com"
                                        />
                                        <InputError className="mt-2" message={errors.email} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Peran & Akses */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Hak Akses</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Tentukan wewenang dan status aktifasi akun.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-6">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="role" value="Peran / Role" className="dark:text-slate-300" />
                                        <select
                                            id="role"
                                            className="mt-1 block w-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg shadow-sm transition-colors text-slate-800 dark:text-slate-100"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            required
                                        >
                                            <option value="staff">Staff Kasir</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                        <InputError className="mt-2" message={errors.role} />
                                    </div>

                                    <label className="group flex items-center p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-800 transition-all cursor-pointer">
                                        <Checkbox
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="w-5 h-5 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                                        />
                                        <div className="ms-4">
                                            <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Akun Aktif</span>
                                            <span className="block text-xs text-slate-500 dark:text-slate-400">Izinkan pengguna ini untuk masuk ke dalam sistem.</span>
                                        </div>
                                    </label>
                                    <InputError className="mt-2" message={errors.is_active} />
                                </div>
                            </div>

                            {/* Section: Keamanan */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Keamanan</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Kosongkan jika Anda tidak ingin mengubah kata sandi pengguna.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                        <div>
                                            <InputLabel htmlFor="password" value="Password Baru" className="dark:text-slate-300" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                autoComplete="new-password"
                                                placeholder="••••••••"
                                            />
                                            <InputError className="mt-2" message={errors.password} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="dark:text-slate-300" />
                                            <TextInput
                                                id="password_confirmation"
                                                type="password"
                                                className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="••••••••"
                                            />
                                            <InputError className="mt-2" message={errors.password_confirmation} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 flex items-center justify-end gap-4">
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Berhasil diperbarui.</p>
                                </Transition>

                                <Link href={route('settings.users.index')}>
                                    <SecondaryButton className="dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600">
                                        Kembali
                                    </SecondaryButton>
                                </Link>

                                <PrimaryButton 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-6"
                                >
                                    Update User
                                </PrimaryButton>
                            </div>
                        </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
