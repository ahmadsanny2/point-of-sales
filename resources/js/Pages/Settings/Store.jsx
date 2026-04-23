import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Store({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name: settings.name || '',
        tagline: settings.tagline || '',
        address: settings.address || '',
        phone: settings.phone || '',
        currency: settings.currency || 'Rp',
        tax_percent: settings.tax_percent || 0,
        logo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.store.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan CMS</h2>}
        >
            <Head title="Pengaturan Toko" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Pengaturan Toko</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Kelola informasi dasar dan konfigurasi operasional toko Anda.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                        <SettingsTabs active="store" />

                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Identitas Toko */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Identitas Toko</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Informasi utama yang akan ditampilkan pada landing page dan laporan.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Toko" className="dark:text-slate-300" />
                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Contoh: Kedai Kopi Nusantara"
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="tagline" value="Tagline / Deskripsi Singkat" className="dark:text-slate-300" />
                                        <TextInput
                                            id="tagline"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.tagline}
                                            onChange={(e) => setData('tagline', e.target.value)}
                                            placeholder="Slogan atau deskripsi singkat bisnis Anda"
                                        />
                                        <InputError className="mt-2" message={errors.tagline} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Keuangan */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Konfigurasi Biaya</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Atur mata uang dan persentase pajak yang berlaku.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <InputLabel htmlFor="currency" value="Mata Uang" className="dark:text-slate-300" />
                                            <TextInput
                                                id="currency"
                                                className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                                value={data.currency}
                                                onChange={(e) => setData('currency', e.target.value)}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.currency} />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="tax_percent" value="Pajak (PPN %)" className="dark:text-slate-300" />
                                            <TextInput
                                                id="tax_percent"
                                                type="number"
                                                step="0.01"
                                                className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                                value={data.tax_percent}
                                                onChange={(e) => setData('tax_percent', e.target.value)}
                                                required
                                            />
                                            <InputError className="mt-2" message={errors.tax_percent} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Kontak & Lokasi */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Kontak & Lokasi</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Informasi ini akan muncul di bagian footer dan struk belanja.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="phone" value="Nomor Telepon" className="dark:text-slate-300" />
                                        <TextInput
                                            id="phone"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Contoh: 08123456789"
                                        />
                                        <InputError className="mt-2" message={errors.phone} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="address" value="Alamat Lengkap" className="dark:text-slate-300" />
                                        <textarea
                                            id="address"
                                            className="mt-1 block w-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg shadow-sm transition-colors text-slate-800 dark:text-slate-100"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            rows="3"
                                            placeholder="Masukkan alamat lengkap toko Anda"
                                        ></textarea>
                                        <InputError className="mt-2" message={errors.address} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Branding */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Branding & Logo</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Logo profesional meningkatkan kepercayaan pelanggan.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                        {settings.logo_path && (
                                            <div className="p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                                                <img 
                                                    src={`/storage/${settings.logo_path}`} 
                                                    alt="Logo Toko" 
                                                    className="h-20 w-20 object-contain rounded-md" 
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 w-full">
                                            <input
                                                id="logo"
                                                type="file"
                                                className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 transition-colors cursor-pointer"
                                                onChange={(e) => setData('logo', e.target.files[0])}
                                                accept="image/*"
                                            />
                                            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 italic">Rekomendasi: PNG transparan, rasio 1:1, max 2MB.</p>
                                            <InputError className="mt-2" message={errors.logo} />
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
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">Berhasil disimpan.</p>
                                </Transition>

                                <PrimaryButton 
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-6"
                                >
                                    Simpan Perubahan
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
