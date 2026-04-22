import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Receipt from '@/Components/Receipt';

export default function Show({ transaction }) {
    const componentRef = useRef();
    
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Invoice-${transaction.invoice_number}`,
    });

    return (
        <AuthenticatedLayout header={`Detail Transaksi - ${transaction.invoice_number}`}>
            <Head title={`Invoice ${transaction.invoice_number}`} />

            {/* Hidden Receipt Component for Printing */}
            <Receipt ref={componentRef} transaction={transaction} />

            <div className="max-w-3xl mx-auto">
                <div className="mb-4">
                    <Link href={route('transactions.index')} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Kembali ke Riwayat
                    </Link>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden print:shadow-none print:border-none transition-colors">
                    {/* Invoice Header */}
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start transition-colors">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-1">INVOICE</h2>
                            <p className="font-mono text-slate-500 dark:text-slate-400 text-sm">{transaction.invoice_number}</p>
                            
                            <div className="mt-6">
                                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">Kasir Bertugas</p>
                                <p className="font-medium text-slate-800 dark:text-slate-200">{transaction.cashier?.name || 'Sistem'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${transaction.status === 'paid' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                {transaction.status === 'paid' ? 'LUNAS' : transaction.status}
                            </div>
                            
                            <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tanggal Transaksi</div>
                            <div className="font-medium text-slate-800 dark:text-slate-200">
                                {dayjs(transaction.created_at).format('DD MMMM YYYY')}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                {dayjs(transaction.created_at).format('HH:mm:ss')}
                            </div>
                        </div>
                    </div>

                    {/* Invoice Items */}
                    <div className="p-8">
                        <table className="w-full text-left border-collapse mb-8">
                            <thead>
                                <tr className="border-b-2 border-slate-200 dark:border-slate-600">
                                    <th className="py-3 px-2 font-semibold text-sm text-slate-700 dark:text-slate-300">Produk</th>
                                    <th className="py-3 px-2 font-semibold text-sm text-slate-700 dark:text-slate-300 text-center">Harga Satuan</th>
                                    <th className="py-3 px-2 font-semibold text-sm text-slate-700 dark:text-slate-300 text-center">Qty</th>
                                    <th className="py-3 px-2 font-semibold text-sm text-slate-700 dark:text-slate-300 text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {transaction.items?.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-700/50 transition-colors">
                                        <td className="py-4 px-2">
                                            <p className="font-medium text-slate-800 dark:text-slate-200">{item.product?.name || 'Produk Dihapus'}</p>
                                            {item.product?.sku && <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{item.product.sku}</p>}
                                        </td>
                                        <td className="py-4 px-2 text-center text-slate-600 dark:text-slate-400">
                                            Rp {Number(item.unit_price).toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-4 px-2 text-center font-medium text-slate-800 dark:text-slate-200">
                                            {item.quantity}
                                        </td>
                                        <td className="py-4 px-2 text-right font-bold text-slate-800 dark:text-slate-100">
                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Summary */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-1/2 lg:w-1/3">
                                <div className="space-y-3">
                                    
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Metode Pembayaran</span>
                                        <span className="font-bold uppercase text-slate-700 dark:text-slate-200">{transaction.payment_method}</span>
                                    </div>
                                    
                                    <div className="pt-3 border-t-2 border-slate-800 dark:border-slate-400 flex justify-between items-center">
                                        <span className="font-bold text-slate-800 dark:text-slate-100">TOTAL BELANJA</span>
                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                                            Rp {Number(transaction.total_amount).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handlePrint}
                        className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium py-2 px-6 rounded-md shadow-sm transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Cetak Struk
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

