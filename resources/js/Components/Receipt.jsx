import React from 'react';
import dayjs from 'dayjs';
import { usePage } from '@inertiajs/react';

const ThermalReceipt = ({ transaction, store, receipt }) => (
    <div className="print-only thermal-layout">
        <style dangerouslySetInnerHTML={{
            __html: `
            @media print {
                @page { margin: 0; size: 58mm auto; }
                body { margin: 0; padding: 0; }
                .thermal-layout {
                    display: block !important;
                    width: 48mm;
                    margin: 0 auto;
                    padding: 5mm 0;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 10pt;
                    color: black;
                    line-height: 1.2;
                }
            }
        `}} />

        <div className="mb-4 text-center">
            {receipt.show_logo === '1' && store.logo_path && (
                <div className="flex justify-center mb-2">
                    <img src={`/storage/${store.logo_path}`} alt="Logo" className="object-contain w-auto h-10 grayscale" />
                </div>
            )}
            <h2 className="text-lg font-bold tracking-widest uppercase">{store.name || 'SalePOS'}</h2>
            <p className="text-xs">{store.tagline || 'Sistem Kasir Modern'}</p>
            {store.address && <p className="text-[10px]">{store.address}</p>}
            {store.phone && <p className="text-[10px]">Telp: {store.phone}</p>}
            {receipt.receipt_header && <p className="text-[10px] mt-1 italic">{receipt.receipt_header}</p>}
        </div>

        <div className="my-2 border-t border-black border-dashed"></div>

        <div className="text-[10px] space-y-1">
            <div className="flex justify-between"><span>No:</span><span>{transaction.invoice_number}</span></div>
            <div className="flex justify-between"><span>Tgl:</span><span>{dayjs(transaction.created_at).format('DD/MM/YY HH:mm')}</span></div>
            <div className="flex justify-between"><span>Kasir:</span><span>{transaction.cashier?.name || 'Admin'}</span></div>
        </div>

        <div className="my-2 border-t border-black border-dashed"></div>

        <table className="w-full text-[10px]">
            <thead>
                <tr className="border-b border-black">
                    <th className="py-1 font-normal text-left">Item</th>
                    <th className="py-1 font-normal text-center">Qty</th>
                    <th className="py-1 font-normal text-right">Total</th>
                </tr>
            </thead>
            <tbody>
                {transaction.items?.map((item, index) => (
                    <tr key={index}>
                        <td className="py-1 leading-tight">
                            {item.product?.name || 'Produk'}
                            <div className="text-[9px]">@{Number(item.unit_price).toLocaleString('id-ID')}</div>
                        </td>
                        <td className="py-1 text-center">{item.quantity}</td>
                        <td className="py-1 text-right">{Number(item.subtotal).toLocaleString('id-ID')}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="my-2 border-t border-black border-dashed"></div>

        <div className="text-[10px] space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{Number(transaction.subtotal).toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span>Pajak (PPN)</span><span>{Number(transaction.tax_amount).toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between pt-1 font-bold border-t border-black"><span>TOTAL</span><span>Rp {Number(transaction.total_amount).toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span>Metode</span><span className="uppercase">{transaction.payment_method}</span></div>
            {transaction.status === 'paid' && <div className="mt-2 italic font-bold text-center underline">--- LUNAS ---</div>}
        </div>

        <div className="my-4 border-t border-black border-dashed"></div>
        <div className="text-center text-[9px] italic whitespace-pre-line">{receipt.receipt_footer || 'Terima kasih'}</div>
        <div className="h-8"></div>
    </div>
);

const InvoiceReceipt = ({ transaction, store, receipt, paperSize }) => {
    const isA4 = paperSize === 'a4';
    const primaryColor = '#2563EB'; // Blue 600

    return (
        <div className="bg-white print-only invoice-layout text-slate-800">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 0; size: ${isA4 ? 'A4' : 'A5'} portrait; }
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white; margin: 0; }
                    .invoice-layout {
                        display: block !important;
                        font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
                        padding: 0;
                        margin: 0;
                    }
                    .no-print { display: none; }
                }
            `}} />

            <div className={`relative mx-auto ${isA4 ? 'w-[210mm] min-h-[297mm]' : 'w-[148mm] min-h-[210mm]'} bg-white overflow-hidden`}>
                {/* Top Decoration - SVG Waves */}
                <div className={`absolute top-0 right-0 left-0 ${isA4 ? 'h-48' : 'h-32'} -z-10 overflow-hidden opacity-10`}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0.00,49.98 C149.99,150.00 349.85,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" fill={primaryColor}></path>
                    </svg>
                </div>
                <div className={`absolute top-0 right-0 left-0 ${isA4 ? 'h-32' : 'h-24'} -z-10 overflow-hidden`}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full opacity-10">
                        <path d="M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" fill={primaryColor}></path>
                    </svg>
                </div>

                <div className={isA4 ? 'p-12' : 'p-8'}>
                    {/* Header Section */}
                    <div className={`flex justify-between items-start ${isA4 ? 'mb-12' : 'mb-8'}`}>
                        <div>
                            <div className="flex gap-4 items-center mb-4">
                                {receipt.show_logo === '1' && store.logo_path && (
                                    <img src={`/storage/${store.logo_path}`} alt="Logo" className={`${isA4 ? 'h-14' : 'h-10'} w-auto object-contain`} />
                                )}
                                <div>
                                    <h1 className={`${isA4 ? 'text-2xl' : 'text-xl'} font-black text-blue-600 tracking-tighter uppercase leading-tight`}>{store.name || 'SalePOS'}</h1>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{store.tagline || 'Sistem Kasir Modern'}</p>
                                </div>
                            </div>
                            <div className="text-[11px] text-slate-500 max-w-[200px] leading-relaxed">
                                {store.address && <p>{store.address}</p>}
                                {store.phone && <p className="font-semibold text-slate-700 mt-0.5">Telp: {store.phone}</p>}
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className={`${isA4 ? 'text-6xl' : 'text-4xl'} font-black text-slate-100 uppercase tracking-tighter leading-none mb-1`}>INVOICE</h2>
                            <p className="font-mono text-base font-bold text-blue-600">{transaction.invoice_number}</p>
                            <p className="text-xs font-medium text-slate-400">{dayjs(transaction.created_at).format('DD MMMM YYYY')}</p>
                        </div>
                    </div>

                    {/* Info Blocks */}
                    <div className={`grid grid-cols-2 ${isA4 ? 'gap-12 mb-12' : 'gap-6 mb-8'}`}>
                        <div>
                            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 border-b border-blue-100 pb-1.5">Rincian Pembayaran</h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-[9px] text-slate-400 uppercase font-bold">Metode Pembayaran:</p>
                                    <p className="text-xs font-bold tracking-wide uppercase text-slate-800">{transaction.payment_method}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-slate-400 uppercase font-bold">Status Transaksi:</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${transaction.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {transaction.status === 'paid' ? 'LUNAS' : transaction.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end text-right">
                            <p className="text-[9px] text-slate-400 uppercase font-bold">Waktu Transaksi:</p>
                            <p className="text-xs font-bold text-slate-800">{dayjs(transaction.created_at).format('HH:mm:ss')}</p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className={`rounded-xl overflow-hidden border border-slate-200 shadow-sm ${isA4 ? 'mb-8' : 'mb-6'}`}>
                        <table className="w-full">
                            <thead>
                                <tr className="text-white bg-blue-600">
                                    <th className={`px-4 ${isA4 ? 'py-4' : 'py-3'} text-left text-[10px] font-black uppercase tracking-widest`}>Produk</th>
                                    <th className={`px-4 ${isA4 ? 'py-4' : 'py-3'} text-center text-[10px] font-black uppercase tracking-widest`}>Harga</th>
                                    <th className={`px-4 ${isA4 ? 'py-4' : 'py-3'} text-center text-[10px] font-black uppercase tracking-widest`}>Qty</th>
                                    <th className={`px-4 ${isA4 ? 'py-4' : 'py-3'} text-right text-[10px] font-black uppercase tracking-widest`}>Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {transaction.items?.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                        <td className={`px-4 ${isA4 ? 'py-5' : 'py-3'} text-slate-800 font-bold text-xs`}>
                                            {item.product?.name || 'Produk'}
                                            {item.product?.sku && <p className="text-[9px] text-slate-400 font-medium mt-0.5 uppercase tracking-wider">SKU: {item.product.sku}</p>}
                                        </td>
                                        <td className={`px-4 ${isA4 ? 'py-5' : 'py-3'} text-center text-slate-500 font-medium whitespace-nowrap text-xs`}>
                                            Rp {Number(item.unit_price).toLocaleString('id-ID')}
                                        </td>
                                        <td className={`px-4 ${isA4 ? 'py-5' : 'py-3'} text-center text-slate-800 font-bold text-xs`}>
                                            {item.quantity}
                                        </td>
                                        <td className={`px-4 ${isA4 ? 'py-5' : 'py-3'} text-right text-slate-900 font-black whitespace-nowrap text-xs`}>
                                            Rp {Number(item.subtotal).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Section: Terms & Totals */}
                    <div className={`grid grid-cols-2 ${isA4 ? 'gap-12' : 'gap-6'} pt-2`}>
                        <div className=""></div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold tracking-wider uppercase text-slate-400">Subtotal</span>
                                <span className="font-bold text-slate-700">Rp {Number(transaction.subtotal).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold tracking-wider uppercase text-slate-400">Pajak (PPN)</span>
                                <span className="font-bold text-slate-700">Rp {Number(transaction.tax_amount).toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                                <span className="text-xs font-black tracking-widest text-blue-600 uppercase">Total</span>
                                <span className={`${isA4 ? 'text-2xl' : 'text-xl'} font-black text-blue-600`}>Rp {Number(transaction.total_amount).toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>

                    <div className='my-10'>
                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Syarat & Ketentuan</h4>
                        <p className="text-[10px] text-slate-500 leading-relaxed italic whitespace-pre-line">
                            {receipt.receipt_footer || 'Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan. Simpan invoice ini sebagai bukti pembayaran yang sah.'}
                        </p>
                    </div>

                    {/* Footer Info */}
                    <div className={`${isA4 ? 'pt-8 mt-24' : 'pt-6 mt-12'} border-t border-slate-100 flex justify-between items-center opacity-50 grayscale`}>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {store.name || 'SalePOS'} &copy; {dayjs().year()}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex gap-4">
                            <span>{store.phone}</span>
                            <span>{store.email}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Decoration */}
                <div className="overflow-hidden absolute right-0 bottom-0 left-0 h-16 opacity-10 -z-10">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-full rotate-180">
                        <path d="M0.00,49.98 C149.99,150.00 349.85,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z" fill={primaryColor}></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

const Receipt = React.forwardRef(({ transaction }, ref) => {
    if (!transaction) return null;

    const { appSettings } = usePage().props;
    const store = appSettings?.store || {};
    const receipt = appSettings?.receipt || {};
    const paperSize = receipt.paper_size || 'thermal';

    return (
        <div ref={ref}>
            <style dangerouslySetInnerHTML={{ __html: `.print-only { display: none; }` }} />
            {paperSize === 'thermal' ? (
                <ThermalReceipt transaction={transaction} store={store} receipt={receipt} />
            ) : (
                <InvoiceReceipt transaction={transaction} store={store} receipt={receipt} paperSize={paperSize} />
            )}
        </div>
    );
});

Receipt.displayName = 'Receipt';

export default Receipt;
