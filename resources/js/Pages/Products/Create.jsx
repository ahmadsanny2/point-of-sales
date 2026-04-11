import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClass = (error) =>
    `w-full rounded-md border ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500'} px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 placeholder-slate-400 dark:placeholder-slate-500 transition-colors`;

const selectClass = (error) =>
    `w-full rounded-md border ${error ? 'border-red-300' : 'border-slate-300 dark:border-slate-600'} px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 transition-colors`;

export default function Create({ categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        category_id: '',
        name: '',
        sku: '',
        price: '',
        stock: '',
        status: 'active',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AuthenticatedLayout header="Tambah Produk Baru">
            <Head title="Tambah Produk" />

            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center bg-slate-50 dark:bg-slate-900/50 transition-colors">
                    <Link href={route('products.index')} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 mr-4 transition-colors">
                        &larr; Kembali
                    </Link>
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Detail Produk</h3>
                </div>

                <form onSubmit={submit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Produk</label>
                            <input id="name" type="text" className={inputClass(errors.name)} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Contoh: Kopi Susu Aren" />
                            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
                        </div>

                        {/* SKU */}
                        <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SKU (Opsional)</label>
                            <input id="sku" type="text" className={inputClass(errors.sku)} value={data.sku} onChange={(e) => setData('sku', e.target.value)} placeholder="Cth: KSA-001" />
                            {errors.sku && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sku}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                            <select id="category_id" className={selectClass(errors.category_id)} value={data.category_id} onChange={(e) => setData('category_id', e.target.value)}>
                                <option value="">Pilih Kategori</option>
                                {categories && categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category_id}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Harga (Rp)</label>
                            <input id="price" type="number" min="0" className={inputClass(errors.price)} value={data.price} onChange={(e) => setData('price', e.target.value)} placeholder="0" />
                            {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Stok Awal</label>
                            <input id="stock" type="number" min="0" className={inputClass(errors.stock)} value={data.stock} onChange={(e) => setData('stock', e.target.value)} placeholder="0" />
                            {errors.stock && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.stock}</p>}
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Gambar Produk</label>
                            <input id="image" type="file" accept="image/*" className={`w-full rounded-md border ${errors.image ? 'border-red-300' : 'border-slate-300 dark:border-slate-600'} px-3 py-2 text-sm text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-700 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-slate-600 file:text-blue-700 dark:file:text-slate-200 transition-colors`} onChange={(e) => setData('image', e.target.files[0])} />
                            {errors.image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>}
                        </div>

                         {/* Status */}
                         <div className="md:col-span-2">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status Produk</label>
                            <select id="status" className={`w-full md:w-1/2 ${selectClass(errors.status)}`} value={data.status} onChange={(e) => setData('status', e.target.value)}>
                                <option value="active">Aktif (Tampil di Kasir)</option>
                                <option value="inactive">Non-aktif (Disembunyikan)</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <Link href={route('products.index')} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
