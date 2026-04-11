import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Dashboard({ stats, latestTransactions }) {
    return (
        <AuthenticatedLayout header="Dashboard Utama">
            <Head title="Dashboard" />

            <div className="py-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Stat Card 1 */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col relative overflow-hidden transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 dark:text-blue-200">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1 z-10 transition-colors">Total Katalog Produk</span>
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 z-10 transition-colors">{stats?.totalProducts || 0}</span>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col relative overflow-hidden transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 dark:text-blue-200">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1 z-10 transition-colors">Transaksi Hari Ini</span>
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 z-10 transition-colors">{stats?.todayTransactions || 0}</span>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 flex flex-col relative overflow-hidden transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10 text-green-600 dark:text-green-400">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path fillRule="evenodd" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-1 z-10 transition-colors">Omset Hari Ini</span>
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 z-10 transition-colors">
                            <span className="text-sm font-normal text-slate-500 dark:text-slate-400 mr-1">Rp</span>
                            {Number(stats?.todayRevenue || 0).toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Stat Card 4 */}
                    <div className={`rounded-xl shadow-sm border p-6 flex flex-col relative overflow-hidden transition-colors ${stats?.lowStockCount > 0 ? 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                        <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-600 dark:text-amber-500">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        </div>
                        <span className={`font-medium text-sm mb-1 z-10 transition-colors ${stats?.lowStockCount > 0 ? 'text-amber-800 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>Peringatan Stok Tipis (&lt; 5)</span>
                        <span className={`text-3xl font-bold z-10 transition-colors ${stats?.lowStockCount > 0 ? 'text-amber-600 dark:text-amber-500' : 'text-slate-800 dark:text-slate-100'}`}>
                            {stats?.lowStockCount || 0} Item
                        </span>
                    </div>
                </div>

                {/* Latest Transactions Table */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center transition-colors">
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 transition-colors">Aktivitas Transaksi Terbaru</h3>
                        <Link href={route('transactions.index')} className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                            Lihat Semua Laporan &rarr;
                        </Link>
                    </div>
                    
                    {latestTransactions?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 transition-colors">
                                        <th className="px-6 py-3 font-medium">Tanggal</th>
                                        <th className="px-6 py-3 font-medium">No. Invoice</th>
                                        <th className="px-6 py-3 font-medium">Petugas Kasir</th>
                                        <th className="px-6 py-3 font-medium">Metode Bayar</th>
                                        <th className="px-6 py-3 font-medium text-right">Total Tagihan</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {latestTransactions.map((trx) => (
                                        <tr key={trx.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                                                {dayjs(trx.created_at).format('DD MMM, HH:mm')}
                                            </td>
                                            <td className="px-6 py-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                                                <Link href={route('transactions.show', trx.id)} className="hover:text-blue-600 dark:hover:text-blue-400 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 transition-colors">
                                                    {trx.invoice_number}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300 transition-colors">
                                                {trx.cashier ? trx.cashier.name : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="uppercase text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded transition-colors">
                                                    {trx.payment_method}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-slate-100 transition-colors">
                                                Rp {Number(trx.total_amount).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-slate-500 dark:text-slate-400 py-12 flex flex-col justify-center items-center transition-colors">
                            <svg className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            <p>Mesin kasir belum menghasilkan riwayat transaksi apapun hari ini.</p>
                            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Aktivitas pembelanjaan baru akan otomatis bermunculan di sini.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
