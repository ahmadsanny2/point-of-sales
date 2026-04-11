import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ categories }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout header="Kategori Produk">
            <Head title="Kategori" />

            {flash?.message && (
                <div className="mb-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{flash.message}</span>
                </div>
            )}

            {flash?.error && (
                <div className="mb-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{flash.error}</span>
                </div>
            )}

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 transition-colors">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Daftar Kategori</h3>
                    <Link
                        href={route('categories.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        + Tambah Kategori
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm border-b border-slate-200 dark:border-slate-700 transition-colors">
                                <th className="px-6 py-4 font-medium">Nama Kategori</th>
                                <th className="px-6 py-4 font-medium">Slug</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 dark:text-slate-300 text-sm">
                            {categories.data?.length > 0 ? (
                                categories.data.map((category) => (
                                    <tr key={category.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{category.name}</td>
                                        <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{category.slug}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={route('categories.edit', category.id)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3 transition-colors">Edit</Link>
                                            <button 
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Hapus Kategori?',
                                                        text: "Kategori yang dihapus tidak dapat dipulihkan!",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#d33',
                                                        cancelButtonColor: '#3085d6',
                                                        confirmButtonText: 'Ya, Hapus!',
                                                        cancelButtonText: 'Batal'
                                                    }).then((result) => {
                                                        if (result.isConfirmed) {
                                                            router.delete(route('categories.destroy', category.id));
                                                        }
                                                    });
                                                }}
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                                        Belum ada data kategori.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {categories.links && (
                     <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-center text-sm transition-colors">
                         <div className="flex gap-1 items-center space-x-1">
                             {categories.links.map((link, index) => (
                                 <Link
                                     key={index}
                                     href={link.url || '#'}
                                     className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600'} ${!link.url && 'opacity-50 cursor-not-allowed'} transition-colors`}
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
