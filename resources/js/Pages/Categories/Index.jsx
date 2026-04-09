import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ categories }) {
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout header="Kategori Produk">
            <Head title="Kategori" />

            {flash?.message && (
                <div className="mb-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{flash.message}</span>
                </div>
            )}

            {flash?.error && (
                <div className="mb-4 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{flash.error}</span>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-medium text-slate-800">Daftar Kategori</h3>
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
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Nama Kategori</th>
                                <th className="px-6 py-4 font-medium">Slug</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 text-sm">
                            {categories.data?.length > 0 ? (
                                categories.data.map((category) => (
                                    <tr key={category.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{category.name}</td>
                                        <td className="px-6 py-4 font-mono text-slate-500">{category.slug}</td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={route('categories.edit', category.id)} className="text-blue-600 hover:text-blue-800 mr-3">Edit</Link>
                                            <Link href={route('categories.destroy', category.id)} method="delete" as="button" className="text-red-600 hover:text-red-800"
                                            onClick={(e) => {
                                                if (!confirm("Yakin ingin menghapus kategori ini?")) {
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
                                    <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                                        Belum ada data kategori.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {categories.links && (
                     <div className="px-6 py-4 border-t border-slate-100 flex justify-center text-sm">
                         <div className="flex gap-1 items-center space-x-1">
                             {categories.links.map((link, index) => (
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
