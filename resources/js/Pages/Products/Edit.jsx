import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        sku: product.sku || '',
        price: product.price || '',
        stock: product.stock || '',
        status: product.status || 'active',
        image: null,
        _method: 'put',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.update', product.id));
    };

    return (
        <AuthenticatedLayout header="Edit Produk">
            <Head title={`Edit - ${product.name}`} />

            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-slate-50">
                    <Link href={route('products.index')} className="text-slate-500 hover:text-slate-700 mr-4">
                        &larr; Kembali
                    </Link>
                    <h3 className="text-lg font-medium text-slate-800">Ubah Data Produk</h3>
                </div>

                <form onSubmit={submit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div className="md:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Produk</label>
                            <input
                                id="name"
                                type="text"
                                className={`w-full rounded-md border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} px-3 py-2 text-sm text-slate-900 bg-white placeholder-slate-400`}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* SKU */}
                        <div>
                            <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">SKU (Opsional)</label>
                            <input
                                id="sku"
                                type="text"
                                className={`w-full rounded-md border ${errors.sku ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                value={data.sku}
                                onChange={(e) => setData('sku', e.target.value)}
                            />
                            {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                            <select
                                id="category_id"
                                className={`w-full rounded-md border ${errors.category_id ? 'border-red-300' : 'border-slate-300'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                            >
                                <option value="">Pilih Kategori...</option>
                                {categories && categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
                            <input
                                id="price"
                                type="number"
                                min="0"
                                className={`w-full rounded-md border ${errors.price ? 'border-red-300 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            />
                            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1">Stok Tersedia</label>
                            <input
                                id="stock"
                                type="number"
                                min="0"
                                className={`w-full rounded-md border ${errors.stock ? 'border-red-300' : 'border-slate-300'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                            />
                            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                        </div>

                        {/* Image */}
                        <div className="md:col-span-2">
                            <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">Gambar Produk</label>
                            {product.image_path && (
                                <div className="mb-2">
                                    <img src={`/storage/${product.image_path}`} alt={product.name} className="h-20 w-20 object-cover rounded shadow-sm border border-slate-200" />
                                </div>
                            )}
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className={`w-full rounded-md border ${errors.image ? 'border-red-300' : 'border-slate-300'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                onChange={(e) => setData('image', e.target.files[0])}
                            />
                            <p className="mt-1 text-xs text-slate-500">Biarkan kosong jika tidak ingin mengubah gambar.</p>
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                        </div>

                         {/* Status */}
                         <div className="md:col-span-2">
                            <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">Status Produk</label>
                            <select
                                id="status"
                                className={`w-full md:w-1/2 rounded-md border ${errors.status ? 'border-red-300' : 'border-slate-300'} px-3 py-2 text-sm text-slate-900 bg-white`}
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                            >
                                <option value="active">Aktif (Tampil di Kasir)</option>
                                <option value="inactive">Non-aktif (Disembunyikan)</option>
                            </select>
                            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                        <Link
                            href={route('products.index')}
                            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
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
