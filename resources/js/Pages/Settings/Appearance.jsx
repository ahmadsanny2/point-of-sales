import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Appearance({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        primary_color: settings.primary_color || '#2563EB',
        accent_color: settings.accent_color || '#38BDF8',
        font_family: settings.font_family || 'Inter',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.appearance.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-slate-800 dark:text-slate-100 leading-tight">Pengaturan CMS</h2>}
        >
            <Head title="Pengaturan Tampilan" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Personalisasi Tampilan</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Sesuaikan warna tema dan tipografi untuk mencerminkan identitas brand Anda.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                        <SettingsTabs active="appearance" />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                                    {/* Section: Warna Tema */}
                                    <div className="pt-6 first:pt-0">
                                        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">Warna Tema</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                                <InputLabel htmlFor="primary_color" value="Warna Utama (Primary)" className="dark:text-slate-300" />
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        id="primary_color"
                                                        value={data.primary_color}
                                                        onChange={(e) => setData('primary_color', e.target.value)}
                                                        className="h-10 w-10 rounded border-0 cursor-pointer bg-transparent"
                                                    />
                                                    <TextInput
                                                        className="flex-1 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                                                        value={data.primary_color}
                                                        onChange={(e) => setData('primary_color', e.target.value)}
                                                    />
                                                </div>
                                                <InputError message={errors.primary_color} />
                                            </div>

                                            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
                                                <InputLabel htmlFor="accent_color" value="Warna Sekunder" className="dark:text-slate-300" />
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        id="accent_color"
                                                        value={data.accent_color}
                                                        onChange={(e) => setData('accent_color', e.target.value)}
                                                        className="h-10 w-10 rounded border-0 cursor-pointer bg-transparent"
                                                    />
                                                    <TextInput
                                                        className="flex-1 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
                                                        value={data.accent_color}
                                                        onChange={(e) => setData('accent_color', e.target.value)}
                                                    />
                                                </div>
                                                <InputError message={errors.accent_color} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Tipografi */}
                                    <div className="pt-8">
                                        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-4">Tipografi</h4>
                                        <div className="max-w-md">
                                            <InputLabel htmlFor="font_family" value="Jenis Huruf (Font Family)" className="dark:text-slate-300" />
                                            <select
                                                id="font_family"
                                                className="mt-1 block w-full border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm"
                                                value={data.font_family}
                                                onChange={(e) => setData('font_family', e.target.value)}
                                            >
                                                <option value="Inter, sans-serif">Inter (Modern & Clean)</option>
                                                <option value="'Poppins', sans-serif">Poppins (Friendly)</option>
                                                <option value="'Roboto', sans-serif">Roboto (Professional)</option>
                                                <option value="'Outfit', sans-serif">Outfit (Premium)</option>
                                            </select>
                                            <InputError message={errors.font_family} />
                                        </div>
                                    </div>

                                    <div className="pt-8 flex items-center gap-4">
                                        <PrimaryButton 
                                            disabled={processing}
                                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 px-6"
                                        >
                                            Simpan Tampilan
                                        </PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-green-600 dark:text-green-400 font-medium">Berhasil disimpan.</p>
                                        </Transition>
                                    </div>
                                </form>
                            </div>

                            <div className="lg:border-s lg:border-slate-100 lg:dark:border-slate-700 lg:ps-8">
                                <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Pratinjau Visual</h4>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-6">
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Teks & Font</p>
                                        <h5 className="text-xl font-bold dark:text-slate-100" style={{ fontFamily: data.font_family }}>
                                            The Quick Brown Fox
                                        </h5>
                                        <p className="text-sm text-slate-500 dark:text-slate-400" style={{ fontFamily: data.font_family }}>
                                            Jumps over the lazy dog. Preview font yang Anda pilih akan muncul di sini.
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">Komponen Utama</p>
                                        <div className="flex flex-wrap gap-2">
                                            <button 
                                                type="button"
                                                className="px-4 py-2 rounded-lg text-white text-sm font-bold shadow-sm transition-all active:scale-95"
                                                style={{ backgroundColor: data.primary_color }}
                                            >
                                                Primary Action
                                            </button>
                                            <button 
                                                type="button"
                                                className="px-4 py-2 rounded-lg text-white text-sm font-bold shadow-sm transition-all active:scale-95 opacity-80"
                                                style={{ backgroundColor: data.accent_color }}
                                            >
                                                Secondary
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                                        <div className="h-2 w-12 rounded-full mb-2" style={{ backgroundColor: data.primary_color, opacity: 0.3 }}></div>
                                        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
