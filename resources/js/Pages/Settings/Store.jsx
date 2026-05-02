import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import ResetButton from '@/Components/ResetButton';
import ResetConfirmModal from '@/Components/ResetConfirmModal';
import { Transition } from '@headlessui/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';

export default function Store({ auth, settings, defaults }) {
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [logoPreview, setLogoPreview] = useState(null);
    
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: settings.name || '',
        tagline: settings.tagline || '',
        address: settings.address || '',
        phone: settings.phone || '',
        email: settings.email || '',
        tax_percent: settings.tax_percent || 0,
        logo: null,
        remove_logo: false,
        show_logo: settings.show_logo === '1' || settings.show_logo === true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.store.update'), {
            forceFormData: true,
        });
    };

    const handleReset = () => {
        setData({
            ...data,
            name: defaults.name,
            tagline: defaults.tagline,
            address: defaults.address,
            phone: defaults.phone,
            email: defaults.email,
            tax_percent: defaults.tax_percent,
            logo: null,
            remove_logo: true,
            show_logo: defaults.show_logo === '1',
        });
        setLogoPreview(null);
        setIsResetModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Pengaturan CMS"
        >
            <Head title="Pengaturan Toko" />

            <div className="space-y-6">
                <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Pengaturan Toko</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Kelola informasi dasar dan konfigurasi operasional toko Anda.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border shadow-sm transition-colors dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                        <SettingsTabs active="store" />

                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Identitas Toko */}
                            <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-3 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Identitas Toko</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Informasi utama yang akan ditampilkan pada landing page dan laporan.
                                    </p>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <div>
                                        <InputLabel htmlFor="name" value="Nama Toko" className="dark:text-slate-300" />
                                        <TextInput
                                            id="name"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
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
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.tagline}
                                            onChange={(e) => setData('tagline', e.target.value)}
                                            placeholder="Slogan atau deskripsi singkat bisnis Anda"
                                        />
                                        <InputError className="mt-2" message={errors.tagline} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Keuangan */}
                            <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Pajak / PPN</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Atur persentase pajak yang berlaku.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="tax_percent" value="Pajak (PPN %)" className="dark:text-slate-300" />
                                        <TextInput
                                            id="tax_percent"
                                            type="number"
                                            step="0.01"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.tax_percent}
                                            onChange={(e) => setData('tax_percent', e.target.value)}
                                            required
                                        />
                                        <InputError className="mt-2" message={errors.tax_percent} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Kontak & Lokasi */}
                            <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Kontak & Lokasi</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Informasi ini akan muncul di bagian footer dan struk belanja.
                                    </p>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <div>
                                        <InputLabel htmlFor="phone" value="Nomor Telepon" className="dark:text-slate-300" />
                                        <TextInput
                                            id="phone"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Contoh: 08123456789"
                                        />
                                        <InputError className="mt-2" message={errors.phone} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="email" value="Email Bisnis" className="dark:text-slate-300" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Contoh: info@tokokopi.com"
                                        />
                                        <InputError className="mt-2" message={errors.email} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="address" value="Alamat Lengkap" className="dark:text-slate-300" />
                                        <textarea
                                            id="address"
                                            className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
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
                            <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Branding & Logo</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Logo profesional meningkatkan kepercayaan pelanggan.
                                    </p>
                                    <div className="mt-4 flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                                        <Checkbox
                                            id="show_logo"
                                            checked={data.show_logo}
                                            onChange={(e) => setData('show_logo', e.target.checked)}
                                            className="text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="show_logo" className="text-sm font-medium text-blue-800 dark:text-blue-300 cursor-pointer">
                                            Tampilkan Logo / Brand
                                        </label>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="flex flex-col gap-6 items-start sm:flex-row sm:items-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="relative p-2 rounded-lg border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                                                {logoPreview ? (
                                                    <img 
                                                        src={logoPreview} 
                                                        alt="Preview Logo" 
                                                        className="object-contain w-24 h-24 rounded-md" 
                                                    />
                                                ) : !data.remove_logo && settings.logo_path ? (
                                                    <img 
                                                        src={`/storage/${settings.logo_path}`} 
                                                        alt="Logo Toko" 
                                                        className="object-contain w-24 h-24 rounded-md" 
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-md">
                                                        <ApplicationLogo forceShow={true} className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                                                    </div>
                                                )}

                                                {/* Badge Reset if marked for removal */}
                                                {data.remove_logo && (
                                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm font-bold animate-pulse z-10">
                                                        Resetting...
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Preview Logo</span>
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                id="logo"
                                                type="file"
                                                className="block w-full text-sm transition-colors cursor-pointer text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50"
                                                onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        setData(prev => ({
                                                            ...prev,
                                                            logo: file,
                                                            remove_logo: false
                                                        }));
                                                        setLogoPreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                                accept="image/*"
                                            />
                                            <p className="mt-2 text-xs italic text-slate-400 dark:text-slate-50">Rekomendasi: PNG transparan, rasio 1:1, max 2MB.</p>
                                            <InputError className="mt-2" message={errors.logo} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-8">
                                <ResetButton onClick={() => setIsResetModalOpen(true)} />

                                <div className="flex gap-4 items-center">
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Berhasil disimpan.</p>
                                    </Transition>

                                    <PrimaryButton 
                                        disabled={processing}
                                        className="px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Simpan Perubahan
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                </div>
            </div>

            <ResetConfirmModal 
                show={isResetModalOpen} 
                onClose={() => setIsResetModalOpen(false)} 
                onConfirm={handleReset} 
            />
        </AuthenticatedLayout>
    );
}
