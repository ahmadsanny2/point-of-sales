import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout header="Detail Produk">
            <Head title={`Detail Produk - ${product.name}`} />

            <div className="mb-6">
                <Link
                    href={route('products.index')}
                    className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors inline-flex"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    Kembali ke Daftar Produk
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center transition-colors">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Informasi Produk</h3>
                    <div className="flex gap-2">
                        <Link
                            href={route('products.edit', product.id)}
                            className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Edit Produk
                        </Link>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Image Column */}
                        <div className="w-full md:w-1/3 flex-shrink-0">
                            <div className="bg-slate-100 dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 aspect-square overflow-hidden flex items-center justify-center transition-colors">
                                {product.image_path ? (
                                    <img 
                                        src={`/storage/${product.image_path}`} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="text-slate-400 dark:text-slate-500 flex flex-col items-center">
                                        <svg className="w-16 h-16 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <span>Tidak ada foto</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Column */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 font-mono mb-1">SKU: {product.sku || 'Tidak ada SKU'}</div>
                                <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{product.name}</h1>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                    Status: {product.status === 'active' ? 'Aktif' : 'Non-aktif'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Harga</h4>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        Rp {Number(product.price).toLocaleString('id-ID')}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Stok Tersedia</h4>
                                    <div className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                        {product.stock}
                                        {product.stock < 10 && (
                                            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full">Menipis</span>
                                        )}
                                        {product.stock === 0 && (
                                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">Habis</span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Kategori</h4>
                                    <div className="text-base text-slate-800 dark:text-slate-200">
                                        {product.category ? product.category.name : '-'}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Terakhir Diperbarui</h4>
                                    <div className="text-base text-slate-800 dark:text-slate-200">
                                        {new Date(product.updated_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}
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
