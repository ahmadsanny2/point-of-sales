import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

/**
 * HistoryModal — Menampilkan daftar transaksi terakhir di POS dengan fitur
 * Pencarian, Filter, dan Pagination.
 */
export default function HistoryModal({ 
    show, 
    onClose, 
    onOpenDetails 
}) {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [paymentMethod, setPaymentMethod] = useState('all');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchTransactions = useCallback(async () => {
        if (!show) return;
        
        setLoading(true);
        try {
            const response = await axios.get(route('pos.transactions'), {
                params: {
                    search,
                    status,
                    payment_method: paymentMethod,
                    page
                }
            });
            setTransactions(response.data.data);
            setLastPage(response.data.last_page);
            setTotal(response.data.total);
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
        } finally {
            setLoading(false);
        }
    }, [show, search, status, paymentMethod, page]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [search, status, paymentMethod]);

    if (!show) return null;

    return (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 backdrop-blur-sm bg-slate-900/60 dark:bg-slate-900/80"
                onClick={onClose}
            />

            {/* Modal Box */}
            <div className="flex overflow-hidden z-10 flex-col w-full max-w-3xl bg-white rounded-2xl shadow-2xl transition-all transform dark:bg-slate-800 h-[85vh]">
                {/* Header */}
                <div className="p-6 border-b transition-colors border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Riwayat Transaksi</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Total {total} transaksi ditemukan</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Search & Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="relative">
                            <input 
                                type="text"
                                placeholder="Cari No. Invoice..."
                                className="w-full pl-10 pr-3 py-2.5 text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg className="w-5 h-5 absolute left-3 top-2.5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <select 
                            className="text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-3 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="all">Semua Status</option>
                            <option value="paid" className="text-green-600 font-bold">Lunas</option>
                            <option value="pending" className="text-amber-600 font-bold">Pending</option>
                        </select>

                        <select 
                            className="text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-2.5 px-3 text-slate-700 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm cursor-pointer"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="all">Semua Metode</option>
                            <option value="cash">Tunai</option>
                            <option value="qris">QRIS</option>
                            <option value="card">Kartu</option>
                        </select>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900/40">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : transactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <p>Tidak ada transaksi ditemukan</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {transactions.map((trx) => (
                                <div 
                                    key={trx.id}
                                    onClick={() => trx.status === 'pending' && trx.payment_details && onOpenDetails(trx)}
                                    className={`p-4 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 transition-all group ${
                                        trx.status === 'pending' && trx.payment_details 
                                            ? 'cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md' 
                                            : ''
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{trx.invoice_number}</div>
                                            <div className="text-xs text-slate-400">{dayjs(trx.created_at).format('DD MMM, HH:mm')}</div>
                                        </div>
                                        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                            trx.status === 'paid' 
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                        }`}>
                                            {trx.status === 'paid' ? 'LUNAS' : 'PENDING'}
                                        </div>
                                    </div>

                                    {/* Item List */}
                                    <div className="mb-3">
                                        {trx.items && trx.items.map((item, idx) => (
                                            <div key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex justify-between">
                                                <span className="line-clamp-1 flex-1">
                                                    • {item.product?.name || 'Produk'} 
                                                    <span className="text-[10px] ml-1 text-slate-400">x{item.quantity}</span>
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-700/50 pt-2">
                                        <div>
                                            <div className="text-sm font-bold text-slate-700 dark:text-slate-200">Rp {Number(trx.total_amount).toLocaleString('id-ID')}</div>
                                            <div className="text-[10px] text-slate-400 uppercase">{trx.payment_method}</div>
                                        </div>
                                        
                                        {trx.status === 'pending' && trx.payment_details && (
                                            <button 
                                                className="text-xs bg-blue-600 group-hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm"
                                            >
                                                Bayar Sekarang
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer / Pagination */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button 
                        disabled={page === 1 || loading}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        Sebelumnya
                    </button>
                    
                    <div className="text-center">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Halaman {page}</span>
                        <p className="text-[10px] text-slate-400">dari {lastPage} halaman</p>
                    </div>

                    <button 
                        disabled={page === lastPage || loading}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-2"
                    >
                        Selanjutnya
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
