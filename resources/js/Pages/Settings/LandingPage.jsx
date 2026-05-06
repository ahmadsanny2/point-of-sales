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

export default function Landing({ auth, settings, defaults }) {
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        hero_badge: settings.hero_badge || '',
        hero_title: settings.hero_title || '',
        hero_subtitle: settings.hero_subtitle || '',
        hero_cta_text: settings.hero_cta_text || '',
        
        features_title: settings.features_title || '',
        features_subtitle: settings.features_subtitle || '',
        features_description: settings.features_description || '',
        
        stats_title: settings.stats_title || '',
        
        how_it_works_title: settings.how_it_works_title || '',
        how_it_works_subtitle: settings.how_it_works_subtitle || '',
        
        pricing_title: settings.pricing_title || '',
        pricing_subtitle: settings.pricing_subtitle || '',
        pricing_description: settings.pricing_description || '',
        
        testimonials_title: settings.testimonials_title || '',
        testimonials_subtitle: settings.testimonials_subtitle || '',
        
        cta_banner_title: settings.cta_banner_title || '',
        cta_banner_subtitle: settings.cta_banner_subtitle || '',
        cta_banner_primary_text: settings.cta_banner_primary_text || '',
        cta_banner_secondary_text: settings.cta_banner_secondary_text || '',
        
        footer_description: settings.footer_description || '',
        footer_text: settings.footer_text || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.landing.update'));
    };

    const handleReset = () => {
        setData({
            hero_badge: defaults.hero_badge,
            hero_title: defaults.hero_title,
            hero_subtitle: defaults.hero_subtitle,
            hero_cta_text: defaults.hero_cta_text,
            
            features_title: defaults.features_title,
            features_subtitle: defaults.features_subtitle,
            features_description: defaults.features_description,
            
            stats_title: defaults.stats_title,
            
            how_it_works_title: defaults.how_it_works_title,
            how_it_works_subtitle: defaults.how_it_works_subtitle,
            
            pricing_title: defaults.pricing_title,
            pricing_subtitle: defaults.pricing_subtitle,
            pricing_description: defaults.pricing_description,
            
            testimonials_title: defaults.testimonials_title,
            testimonials_subtitle: defaults.testimonials_subtitle,
            
            cta_banner_title: defaults.cta_banner_title,
            cta_banner_subtitle: defaults.cta_banner_subtitle,
            cta_banner_primary_text: defaults.cta_banner_primary_text,
            cta_banner_secondary_text: defaults.cta_banner_secondary_text,
            
            footer_description: defaults.footer_description,
            footer_text: defaults.footer_text,
        });
        setIsResetModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Pengaturan CMS"
        >
            <Head title="Pengaturan Landing Page" />

            <div className="space-y-6">
                <div className="px-4 sm:px-0">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Pengaturan Landing Page</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Sesuaikan konten halaman utama aplikasi Anda untuk menarik lebih banyak pengguna.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-xl border shadow-sm transition-colors dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                    <SettingsTabs active="landing" />

                    <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                        {/* Section: Hero */}
                        <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-3 first:pt-0">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Hero</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Konten utama yang pertama kali dilihat pengunjung.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="hero_badge" value="Badge Teks (Kecil)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="hero_badge"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.hero_badge}
                                        onChange={(e) => setData('hero_badge', e.target.value)}
                                        placeholder="Contoh: Sistem POS Terpercaya #1"
                                    />
                                    <InputError className="mt-2" message={errors.hero_badge} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hero_title" value="Judul Utama (Headline)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="hero_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.hero_title}
                                        onChange={(e) => setData('hero_title', e.target.value)}
                                        placeholder="Judul besar yang menarik"
                                    />
                                    <InputError className="mt-2" message={errors.hero_title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hero_subtitle" value="Sub-judul" className="dark:text-slate-300" />
                                    <textarea
                                        id="hero_subtitle"
                                        className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
                                        value={data.hero_subtitle}
                                        onChange={(e) => setData('hero_subtitle', e.target.value)}
                                        rows="3"
                                        placeholder="Deskripsi singkat layanan Anda"
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.hero_subtitle} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="hero_cta_text" value="Teks Tombol CTA" className="dark:text-slate-300" />
                                    <TextInput
                                        id="hero_cta_text"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.hero_cta_text}
                                        onChange={(e) => setData('hero_cta_text', e.target.value)}
                                        placeholder="Contoh: Mulai Gratis Sekarang"
                                    />
                                    <InputError className="mt-2" message={errors.hero_cta_text} />
                                </div>
                            </div>
                        </div>

                        {/* Section: Features */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Fitur</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Jelaskan keunggulan aplikasi Anda.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="features_title" value="Label Fitur (Kecil)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="features_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.features_title}
                                        onChange={(e) => setData('features_title', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.features_title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="features_subtitle" value="Judul Seksi Fitur" className="dark:text-slate-300" />
                                    <TextInput
                                        id="features_subtitle"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.features_subtitle}
                                        onChange={(e) => setData('features_subtitle', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.features_subtitle} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="features_description" value="Deskripsi Seksi Fitur" className="dark:text-slate-300" />
                                    <textarea
                                        id="features_description"
                                        className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
                                        value={data.features_description}
                                        onChange={(e) => setData('features_description', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.features_description} />
                                </div>
                            </div>
                        </div>

                        {/* Section: Stats & How It Works */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Statistik & Cara Kerja</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Atur judul untuk bagian statistik dan langkah-langkah penggunaan.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="stats_title" value="Judul Seksi Statistik" className="dark:text-slate-300" />
                                    <TextInput
                                        id="stats_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.stats_title}
                                        onChange={(e) => setData('stats_title', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.stats_title} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="how_it_works_title" value="Label Cara Kerja" className="dark:text-slate-300" />
                                        <TextInput
                                            id="how_it_works_title"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.how_it_works_title}
                                            onChange={(e) => setData('how_it_works_title', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.how_it_works_title} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="how_it_works_subtitle" value="Judul Seksi Cara Kerja" className="dark:text-slate-300" />
                                        <TextInput
                                            id="how_it_works_subtitle"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.how_it_works_subtitle}
                                            onChange={(e) => setData('how_it_works_subtitle', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.how_it_works_subtitle} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Pricing */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Harga</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Atur pesan penawaran harga Anda.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="pricing_title" value="Label Harga (Kecil)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="pricing_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.pricing_title}
                                        onChange={(e) => setData('pricing_title', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.pricing_title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="pricing_subtitle" value="Judul Seksi Harga" className="dark:text-slate-300" />
                                    <TextInput
                                        id="pricing_subtitle"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.pricing_subtitle}
                                        onChange={(e) => setData('pricing_subtitle', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.pricing_subtitle} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="pricing_description" value="Deskripsi Seksi Harga" className="dark:text-slate-300" />
                                    <textarea
                                        id="pricing_description"
                                        className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
                                        value={data.pricing_description}
                                        onChange={(e) => setData('pricing_description', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.pricing_description} />
                                </div>
                            </div>
                        </div>

                        {/* Section: Testimonials */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Testimoni</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Atur judul untuk bagian testimoni pelanggan.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="testimonials_title" value="Label Testimoni (Kecil)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="testimonials_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.testimonials_title}
                                        onChange={(e) => setData('testimonials_title', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.testimonials_title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="testimonials_subtitle" value="Judul Seksi Testimoni" className="dark:text-slate-300" />
                                    <TextInput
                                        id="testimonials_subtitle"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.testimonials_subtitle}
                                        onChange={(e) => setData('testimonials_subtitle', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.testimonials_subtitle} />
                                </div>
                            </div>
                        </div>

                        {/* Section: CTA Banner */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Banner CTA Bawah</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Ajakan bertindak di bagian bawah sebelum footer.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="cta_banner_title" value="Judul Banner CTA" className="dark:text-slate-300" />
                                    <TextInput
                                        id="cta_banner_title"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.cta_banner_title}
                                        onChange={(e) => setData('cta_banner_title', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.cta_banner_title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cta_banner_subtitle" value="Sub-judul Banner CTA" className="dark:text-slate-300" />
                                    <textarea
                                        id="cta_banner_subtitle"
                                        className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
                                        value={data.cta_banner_subtitle}
                                        onChange={(e) => setData('cta_banner_subtitle', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.cta_banner_subtitle} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="cta_banner_primary_text" value="Teks Tombol Utama" className="dark:text-slate-300" />
                                        <TextInput
                                            id="cta_banner_primary_text"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.cta_banner_primary_text}
                                            onChange={(e) => setData('cta_banner_primary_text', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.cta_banner_primary_text} />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="cta_banner_secondary_text" value="Teks Tombol Kedua" className="dark:text-slate-300" />
                                        <TextInput
                                            id="cta_banner_secondary_text"
                                            className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.cta_banner_secondary_text}
                                            onChange={(e) => setData('cta_banner_secondary_text', e.target.value)}
                                        />
                                        <InputError className="mt-2" message={errors.cta_banner_secondary_text} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Footer */}
                        <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                            <div>
                                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Bagian Footer</h4>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Informasi penutup di bagian bawah halaman.
                                </p>
                            </div>
                            <div className="space-y-4 md:col-span-2">
                                <div>
                                    <InputLabel htmlFor="footer_description" value="Deskripsi Brand (Footer)" className="dark:text-slate-300" />
                                    <textarea
                                        id="footer_description"
                                        className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-slate-100"
                                        value={data.footer_description}
                                        onChange={(e) => setData('footer_description', e.target.value)}
                                        rows="2"
                                    ></textarea>
                                    <InputError className="mt-2" message={errors.footer_description} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="footer_text" value="Teks Hak Cipta (Copyright)" className="dark:text-slate-300" />
                                    <TextInput
                                        id="footer_text"
                                        className="block mt-1 w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                        value={data.footer_text}
                                        onChange={(e) => setData('footer_text', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors.footer_text} />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8">
                            <ResetButton onClick={() => setIsResetModalOpen(true)} />

                            <div className="flex gap-4 items-center">
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
