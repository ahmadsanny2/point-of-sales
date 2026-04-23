import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function LandingPage({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        cta_text: settings.cta_text || '',
        footer_text: settings.footer_text || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.landing.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan CMS</h2>}
        >
            <Head title="Pengaturan Landing Page" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Konten Landing Page</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Sesuaikan narasi dan pesan pemasaran untuk pengunjung website Anda.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                        <SettingsTabs active="landing" />

                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Hero Content */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Utama (Hero)</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Judul dan deskripsi yang pertama kali dilihat oleh calon pelanggan.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="hero_title" value="Judul Utama (Heading)" className="dark:text-slate-300 font-semibold" />
                                        <TextInput
                                            id="hero_title"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all font-bold text-lg"
                                            value={data.hero_title}
                                            onChange={(e) => setData('hero_title', e.target.value)}
                                            required
                                            placeholder="Contoh: Solusi POS Pintar untuk Bisnis Anda"
                                        />
                                        <InputError className="mt-2" message={errors.hero_title} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="hero_subtitle" value="Sub-judul / Deskripsi Pendek" className="dark:text-slate-300 font-semibold" />
                                        <textarea
                                            id="hero_subtitle"
                                            className="mt-1 block w-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg shadow-sm transition-colors text-slate-800 dark:text-slate-100"
                                            value={data.hero_subtitle}
                                            onChange={(e) => setData('hero_subtitle', e.target.value)}
                                            rows="3"
                                            required
                                            placeholder="Jelaskan manfaat utama layanan Anda di sini..."
                                        ></textarea>
                                        <InputError className="mt-2" message={errors.hero_subtitle} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Call to Action */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Tombol Aksi (CTA)</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Teks pada tombol yang mengarahkan pengunjung untuk mendaftar atau mencoba.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="cta_text" value="Teks Tombol Utama" className="dark:text-slate-300 font-semibold" />
                                        <TextInput
                                            id="cta_text"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                            value={data.cta_text}
                                            onChange={(e) => setData('cta_text', e.target.value)}
                                            required
                                            placeholder="Contoh: Mulai Sekarang — Gratis!"
                                        />
                                        <InputError className="mt-2" message={errors.cta_text} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Footer */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Kaki Halaman (Footer)</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Informasi tambahan atau hak cipta di bagian paling bawah website.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="footer_text" value="Teks Hak Cipta / Footer" className="dark:text-slate-300 font-semibold" />
                                        <TextInput
                                            id="footer_text"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                            value={data.footer_text}
                                            onChange={(e) => setData('footer_text', e.target.value)}
                                            required
                                            placeholder="Contoh: © 2024 SalePOS. All Rights Reserved."
                                        />
                                        <InputError className="mt-2" message={errors.footer_text} />
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
                                    Simpan Konten
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
