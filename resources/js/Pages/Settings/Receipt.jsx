import { useForm, Head } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SettingsTabs from './Partials/SettingsTabs';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';
import ResetButton from '@/Components/ResetButton';
import ResetConfirmModal from '@/Components/ResetConfirmModal';
import { Transition } from '@headlessui/react';

export default function Receipt({ auth, settings, defaults }) {
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        receipt_header: settings.receipt_header || '',
        receipt_footer: settings.receipt_footer || '',
        invoice_prefix: settings.invoice_prefix || 'INV',
        show_logo: settings.show_logo === '1' || settings.show_logo === true,
        paper_size: settings.paper_size || 'thermal',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('settings.receipt.update'));
    };

    const handleReset = () => {
        setData({
            receipt_header: defaults.receipt.receipt_header,
            receipt_footer: defaults.receipt.receipt_footer,
            invoice_prefix: defaults.receipt.invoice_prefix,
            show_logo: defaults.receipt.show_logo,
            paper_size: defaults.receipt.paper_size,
        });
        setIsResetModalOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header="Pengaturan CMS"
        >
            <Head title="Pengaturan Struk" />

            <div className="space-y-6">
                <div className="px-4 sm:px-0">
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">Pengaturan Struk Belanja</h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Konfigurasi tampilan struk fisik dan format penomoran transaksi.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-xl border shadow-sm transition-colors dark:bg-slate-800 border-slate-100 dark:border-slate-700">
                        <SettingsTabs active="receipt" />

                        <form onSubmit={submit} className="space-y-8 divide-y divide-slate-100 dark:divide-slate-700">
                            {/* Section: Penomoran */}
                            <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-3 first:pt-0">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Penomoran</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Atur awalan kode unik untuk setiap transaksi yang terjadi.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <div className="max-w-md">
                                        <InputLabel htmlFor="invoice_prefix" value="Prefix Nomor Invoice" className="dark:text-slate-300" />
                                        <TextInput
                                            id="invoice_prefix"
                                            className="block mt-1 w-full font-mono transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.invoice_prefix}
                                            onChange={(e) => setData('invoice_prefix', e.target.value)}
                                            required
                                            placeholder="CONTOH: INV"
                                        />
                                        <p className="inline-block px-3 py-2 mt-2 text-xs font-medium text-blue-500 bg-blue-50 rounded-lg dark:text-blue-400 dark:bg-blue-900/30">
                                            💡 Format: {data.invoice_prefix}-YYYYMMDD-XXXX
                                        </p>
                                        <InputError className="mt-2" message={errors.invoice_prefix} />
                                    </div>
                                </div>
                            </div>

                            {/* Section: Pesan Struk */}
                            <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Pesan Struk</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Tambahkan ucapan atau informasi tambahan pada struk fisik.
                                    </p>
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <div>
                                        <InputLabel htmlFor="receipt_header" value="Pesan Header (Pembuka)" className="dark:text-slate-300" />
                                        <TextInput
                                            id="receipt_header"
                                            className="block mt-1 w-full transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-slate-100"
                                            value={data.receipt_header}
                                            onChange={(e) => setData('receipt_header', e.target.value)}
                                            required
                                            placeholder="Contoh: Terima Kasih Telah Berkunjung"
                                        />
                                        <InputError className="mt-2" message={errors.receipt_header} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="receipt_footer" value="Pesan Footer (Penutup)" className="dark:text-slate-300" />
                                        <textarea
                                            id="receipt_footer"
                                            className="block mt-1 w-full bg-white rounded-lg shadow-sm transition-colors border-slate-200 dark:border-slate-700 dark:bg-slate-900/50 focus:border-primary focus:ring-primary text-slate-800 dark:text-slate-100"
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
                            <div className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
                                <div>
                                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100">Opsi Tampilan & Format</h4>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Kontrol ukuran struk dan elemen yang ditampilkan.
                                    </p>
                                </div>
                                <div className="space-y-6 md:col-span-2">
                                    <div>
                                        <InputLabel value="Ukuran Kertas Invoice / Struk" className="mb-3 dark:text-slate-300" />
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            {[
                                                { id: 'thermal', label: 'Thermal (58mm)', desc: 'Cocok untuk kasir minimarket/retail.' },
                                                { id: 'a5', label: 'Kertas A5', desc: 'Cocok untuk nota faktur/invoice kecil.' },
                                                { id: 'a4', label: 'Kertas A4', desc: 'Cocok untuk invoice profesional B2B.' },
                                            ].map((size) => (
                                                <label 
                                                    key={size.id}
                                                    className={`
                                                        relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none transition-colors
                                                        ${data.paper_size === size.id 
                                                            ? 'bg-blue-50 border-blue-600 dark:bg-blue-900/20 dark:border-blue-500 z-10' 
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                                        }
                                                    `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="paper_size"
                                                        value={size.id}
                                                        className="sr-only"
                                                        onChange={(e) => setData('paper_size', e.target.value)}
                                                        checked={data.paper_size === size.id}
                                                    />
                                                    <span className="flex flex-1">
                                                        <span className="flex flex-col">
                                                            <span className={`block text-sm font-medium ${data.paper_size === size.id ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-slate-200'}`}>
                                                                {size.label}
                                                            </span>
                                                            <span className={`mt-1 flex items-center text-xs ${data.paper_size === size.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 dark:text-slate-400'}`}>
                                                                {size.desc}
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <svg
                                                        className={`h-5 w-5 ${data.paper_size === size.id ? 'text-blue-600 dark:text-blue-400' : 'hidden'}`}
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                                    </svg>
                                                </label>
                                            ))}
                                        </div>
                                        <InputError className="mt-2" message={errors.paper_size} />
                                    </div>
                                    <label className="flex items-center p-4 rounded-xl border transition-all cursor-pointer group bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-slate-100 dark:border-slate-700 hover:border-blue-100 dark:hover:border-blue-800">
                                        <Checkbox
                                            name="show_logo"
                                            checked={data.show_logo}
                                            onChange={(e) => setData('show_logo', e.target.checked)}
                                            className="w-5 h-5 text-blue-600 rounded border-slate-300 dark:border-slate-700 focus:ring-blue-500"
                                        />
                                        <div className="ms-4">
                                            <span className="block text-sm transition-colors text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">Tampilkan Logo Toko</span>
                                            <span className="block text-xs text-slate-500 dark:text-slate-400">Gunakan logo yang sudah diunggah pada Pengaturan Toko.</span>
                                        </div>
                                    </label>
                                    <InputError className="mt-2" message={errors.show_logo} />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-8">
                                <ResetButton onClick={() => setIsResetModalOpen(true)} />

                                <div className="flex gap-4 items-center">
                                    <PrimaryButton 
                                        disabled={processing}
                                        className="px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >
                                        Simpan Konfigurasi
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                </div>
            </div>

            <ResetConfirmModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={handleReset}
                title="Reset Pengaturan Struk"
                description="Apakah Anda yakin ingin mereset pengaturan struk ke nilai default? Perubahan ini belum akan tersimpan ke database sampai Anda menekan tombol 'Simpan Konfigurasi'."
            />
        </AuthenticatedLayout>
    );
}
