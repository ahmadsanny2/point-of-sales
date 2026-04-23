import React from 'react';
import dayjs from 'dayjs';
import { usePage } from '@inertiajs/react';

const Receipt = React.forwardRef(({ transaction }, ref) => {
    if (!transaction) return null;

    const { appSettings } = usePage().props;
    const store = appSettings?.store || {};
    const receipt = appSettings?.receipt || {};

    return (
        <div ref={ref} className="print-only">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page {
                        margin: 0;
                        size: 58mm auto;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .print-only {
                        display: block !important;
                        width: 48mm; /* Adjust for margins on 58mm paper */
                        margin: 0 auto;
                        padding: 5mm 0;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 10pt;
                        color: black;
                        line-height: 1.2;
                    }
                }
                .print-only {
                    display: none;
                }
            `}} />
            
            <div className="text-center mb-4">
                {receipt.show_logo === '1' && store.logo_path && (
                    <div className="flex justify-center mb-2">
                        <img src={`/storage/${store.logo_path}`} alt="Logo" className="h-10 w-auto object-contain grayscale" />
                    </div>
                )}
                <h2 className="text-lg font-bold uppercase tracking-widest">{store.name || 'SalePOS'}</h2>
                <p className="text-xs">{store.tagline || 'Sistem Kasir Modern'}</p>
                {store.address && <p className="text-[10px]">{store.address}</p>}
                {store.phone && <p className="text-[10px]">Telp: {store.phone}</p>}
                {receipt.receipt_header && <p className="text-[10px] mt-1 italic">{receipt.receipt_header}</p>}
            </div>

            <div className="border-t border-dashed border-black my-2"></div>

            <div className="text-[10px] space-y-1">
                <div className="flex justify-between">
                    <span>No:</span>
                    <span>{transaction.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tgl:</span>
                    <span>{dayjs(transaction.created_at).format('DD/MM/YY HH:mm')}</span>
                </div>
                <div className="flex justify-between">
                    <span>Kasir:</span>
                    <span>{transaction.cashier?.name || 'Admin'}</span>
                </div>
            </div>

            <div className="border-t border-dashed border-black my-2"></div>

            <table className="w-full text-[10px]">
                <thead>
                    <tr className="border-b border-black">
                        <th className="text-left font-normal py-1">Item</th>
                        <th className="text-center font-normal py-1">Qty</th>
                        <th className="text-right font-normal py-1">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {transaction.items?.map((item, index) => (
                        <tr key={index}>
                            <td className="py-1 leading-tight">
                                {item.product?.name || 'Produk'}
                                <div className="text-[9px]">@{Number(item.unit_price).toLocaleString('id-ID')}</div>
                            </td>
                            <td className="text-center py-1">{item.quantity}</td>
                            <td className="text-right py-1">{Number(item.subtotal).toLocaleString('id-ID')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="border-t border-dashed border-black my-2"></div>

            <div className="text-[10px] space-y-1">
                <div className="flex justify-between font-bold">
                    <span>TOTAL</span>
                    <span>Rp {Number(transaction.total_amount).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                    <span>Metode</span>
                    <span className="uppercase">{transaction.payment_method}</span>
                </div>
                {transaction.status === 'paid' && (
                    <div className="text-center mt-2 font-bold italic underline">
                        --- LUNAS ---
                    </div>
                )}
            </div>

            <div className="border-t border-dashed border-black my-4"></div>

            <div className="text-center text-[9px] italic whitespace-pre-line">
                {receipt.receipt_footer || 'Terima kasih atas kunjungan Anda'}
            </div>
            
            <div className="h-8"></div> {/* Bottom margin for cutter */}
        </div>
    );
});

Receipt.displayName = 'Receipt';

export default Receipt;
