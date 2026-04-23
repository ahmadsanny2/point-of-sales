import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import { Transition } from '@headlessui/react';

export default function Receipt({ auth, settings }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        receipt_header: settings.receipt_header || '',
        receipt_footer: settings.receipt_footer || '',
        invoice_prefix: settings.invoice_prefix || 'INV',
        show_logo: settings.show_logo === '1' || settings.show_logo === true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.receipt.update'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pengaturan CMS</h2>}
        >
            <Head title="Pengaturan Struk" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Pengaturan Struk Belanja</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Konfigurasi tampilan struk fisik dan format penomoran transaksi.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 transition-colors">
                        <SettingsTabs active="receipt" />

                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Penomoran */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Penomoran</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Atur awalan kode unik untuk setiap transaksi yang terjadi.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="invoice_prefix" value="Prefix Nomor Invoice" className="dark:text-slate-300 font-semibold" />
                                        <TextInput
                                            id="invoice_prefix"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all font-mono font-bold"
                                            value={data.invoice_prefix}
                                            onChange={(e) => setData('invoice_prefix', e.target.value)}
                                            required
                                            placeholder="CONTOH: INV"
                                        />
                                        <p className="mt-2 text-xs text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-2 rounded-lg inline-block font-medium">
                                            💡 Format: {data.invoice_prefix}-YYYYMMDD-XXXX
                                        </p>
                                        <InputError className="mt-2" message={errors.invoice_prefix} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Pesan Struk */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Pesan Struk</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Tambahkan ucapan atau informasi tambahan pada struk fisik.
                                    </p>
                                </div>
                                <div className="md:col-span-2 space-y-4">
                                    <div>
                                        <InputLabel htmlFor="receipt_header" value="Pesan Header (Pembuka)" className="dark:text-slate-300 font-semibold" />
                                        <TextInput
                                            id="receipt_header"
                                            className="mt-1 block w-full dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100 transition-all"
                                            value={data.receipt_header}
                                            onChange={(e) => setData('receipt_header', e.target.value)}
                                            required
                                            placeholder="Contoh: Terima Kasih Telah Berkunjung"
                                        />
                                        <InputError className="mt-2" message={errors.receipt_header} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="receipt_footer" value="Pesan Footer (Penutup)" className="dark:text-slate-300 font-semibold" />
                                        <textarea
                                            id="receipt_footer"
                                            className="mt-1 block w-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg shadow-sm transition-colors text-slate-800 dark:text-slate-100"
                                            value={data.receipt_footer}
                                            onChange={(e) => setData('receipt_footer', e.target.value)}
                                            rows="3"
                                            required
                                            placeholder="Contoh: Barang yang sudah dibeli tidak dapat ditukar kembali."
                                        ></textarea>
                                        <InputError className="mt-2" message={errors.receipt_footer} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Opsi Tampilan */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Opsi Tampilan</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Kontrol elemen apa saja yang muncul pada struk belanja.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="group flex items-center p-4 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-800 transition-all cursor-pointer">
                                        <Checkbox
                                            name="show_logo"
                                            checked={data.show_logo}
                                            onChange={(e) => setData('show_logo', e.target.checked)}
                                            className="w-5 h-5 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                                        />
                                        <div className="ms-4">
                                            <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Tampilkan Logo Toko</span>
                                            <span className="block text-xs text-slate-500 dark:text-slate-400">Gunakan logo yang sudah diunggah pada Pengaturan Toko.</span>
                                        </div>
                                    </label>
                                    <InputError className="mt-2" message={errors.show_logo} />
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
                                    Simpan Konfigurasi
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
