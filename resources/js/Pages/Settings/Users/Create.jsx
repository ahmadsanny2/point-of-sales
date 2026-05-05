import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function UserCreate({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'staff',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.users.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Tambah Pengguna"
        >
            <Head title="Tambah Pengguna" />

            <div className="space-y-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                        <div className="max-w-xl">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError className="mt-2" message={errors.email} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <select
                                        id="role"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        required
                                    >
                                        <option value="staff">Staff Kasir</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                    <InputError className="mt-2" message={errors.role} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.password} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            className="mt-1 block w-full"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.password_confirmation} />
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4">
                                    <PrimaryButton disabled={processing}>Simpan User</PrimaryButton>
                                    <Link href={route('settings.users.index')}>
                                        <SecondaryButton>Batal</SecondaryButton>
                                    </Link>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
