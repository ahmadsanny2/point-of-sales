import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Index({ transactions }) {
    return (
        <AuthenticatedLayout header="Riwayat Transaksi">
            <Head title="Riwayat Transaksi" />

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-medium text-slate-800">Semua Waktu</h3>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Tanggal</th>
                                <th className="px-6 py-4 font-medium">No. Invoice</th>
                                <th className="px-6 py-4 font-medium">Kasir</th>
                                <th className="px-6 py-4 font-medium">Metode</th>
                                <th className="px-6 py-4 font-medium text-right">Total Transaksi</th>
                                <th className="px-6 py-4 font-medium text-center">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700 text-sm">
                            {transactions.data?.length > 0 ? (
                                transactions.data.map((trx) => (
                                    <tr key={trx.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 text-slate-500">
                                            {dayjs(trx.created_at).format('DD MMM YYYY, HH:mm')}
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                            {trx.invoice_number}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {trx.cashier ? trx.cashier.name : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="uppercase text-xs font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                {trx.payment_method}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-800">
                                            Rp {Number(trx.total_amount).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${trx.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {trx.status === 'paid' ? 'Lunas' : 'Dibatalkan'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={route('transactions.show', trx.id)} className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors">
                                                Lihat Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                        <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        Belum ada riwayat transaksi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {transactions.links && (
                     <div className="px-6 py-4 border-t border-slate-100 flex justify-center text-sm">
                         <div className="flex gap-1 items-center space-x-1">
                             {transactions.links.map((link, index) => (
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
