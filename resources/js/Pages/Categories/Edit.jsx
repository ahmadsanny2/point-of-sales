import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    return (
        <AuthenticatedLayout header="Edit Kategori">
            <Head title={`Edit - ${category.name}`} />

            <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center bg-slate-50 dark:bg-slate-900/50 transition-colors">
                    <Link href={route('categories.index')} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mr-4 transition-colors">
                        &larr; Kembali
                    </Link>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Ubah Data Kategori</h3>
                </div>

                <form onSubmit={submit} className="p-6">
                    <div className="mb-6">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Kategori</label>
                        <input
                            id="name"
                            type="text"
                            className={`w-full rounded-md border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'} px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 transition-colors`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Link
                            href={route('categories.index')}
                            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
