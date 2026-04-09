import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ products }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout header="Manajemen Produk">
            <Head title="Produk" />

            {flash?.message && (
                <div className="mb-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{flash.message}</span>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-medium text-slate-800">Daftar Produk</h3>
                    <Link
                        href={route('products.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        + Tambah Produk
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                                <th className="px-6 py-4 font-medium w-16"></th>
                                <th className="px-6 py-4 font-medium">SKU</th>
                                <th className="px-6 py-4 font-medium">Nama Produk</th>
                                <th className="px-6 py-4 font-medium">Kategori</th>
                                <th className="px-6 py-4 font-medium text-right">Harga</th>
                                <th className="px-6 py-4 font-medium text-center">Stok</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 text-sm">
                            {products.data?.length > 0 ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {product.image_path ? (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="w-10 h-10 object-cover rounded-md shadow-sm border border-slate-200" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 font-mono text-slate-500">{product.sku || '-'}</td>
                                        <td className="px-6 py-4 font-medium">{product.name}</td>
                                        <td className="px-6 py-4">
                                            {product.category ? product.category.name : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">
                                            Rp {Number(product.price).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {product.status === 'active' ? 'Aktif' : 'Non-aktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={route('products.edit', product.id)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                                            <Link href={route('products.destroy', product.id)} method="delete" as="button" className="text-red-600 hover:text-red-800"
                                            onClick={(e) => {
                                                if (!confirm("Yakin ingin menghapus produk ini?")) {
                                                    e.preventDefault();
                                                }
                                            }}>
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-slate-500">
                                        Belum ada data produk.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {products.links && (
                     <div className="px-6 py-4 border-t border-slate-100 flex justify-center text-sm">
                         <div className="flex gap-1 items-center space-x-1">
                             {products.links.map((link, index) => (
                                 <Link
                                     key={index}
                                     href={link.url || '#'}
                                     className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100 border border-slate-200'} ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                     dangerouslySetInnerHTML={{ __html: link.label }}
                                 ></Link>
                             ))}
                         </div>
                     </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
