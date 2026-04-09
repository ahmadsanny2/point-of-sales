import PosLayout from '@/Layouts/PosLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';

export default function Index({ categories, products }) {
    const { flash } = usePage().props;
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState([]);

    const { data, setData, post, processing } = useForm({
        payment_method: 'cash',
        cart: [],
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [tenderedAmount, setTenderedAmount] = useState('');
    const [showMobileCart, setShowMobileCart] = useState(false);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = activeCategory === 'all' || product.category_id === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [products, activeCategory, searchQuery]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) {
                    alert('Melampaui stok yang tersedia!');
                    return prev;
                }
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + delta;
                if (newQuantity < 1) return item;
                if (newQuantity > item.stock) {
                    alert('Melampaui stok yang tersedia!');
                    return item;
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.11; // 11% tax default
    const total = subtotal + tax;

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setData('cart', cart);
        setShowPaymentModal(true);
        setTenderedAmount('');
    };

    const submitPayment = () => {
        if (data.payment_method === 'cash' && Number(tenderedAmount) < total) {
            return alert('Uang yang diterima kurang dari total tagihan!');
        }

        post(route('pos.checkout'), {
            onSuccess: () => {
                setCart([]);
                setShowPaymentModal(false);
            }
        });
    };

    return (
        <PosLayout>
            <Head title="Kasir Kiosk" />

            <div className="flex h-full w-full relative">
                {/* Left Area: Product Grid (70%) */}
                <div className="w-full lg:w-2/3 xl:w-3/4 flex flex-col h-full border-r border-slate-200 bg-slate-50">
                    
                    {/* Search & Categories Bar */}
                    <div className="p-4 bg-white border-b border-slate-200 shrink-0">
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Cari nama produk atau SKU..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Category Pills */}
                        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                Semua Produk
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {flash?.message && (
                            <div className="mb-4 bg-green-100 text-green-700 px-4 py-3 rounded-lg shadow-sm border border-green-200">
                                {flash.message}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg shadow-sm border border-red-200">
                                {flash.error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-20 lg:pb-4">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map(product => (
                                    <button 
                                        key={product.id}
                                        onClick={() => addToCart(product)}
                                        className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col active:scale-95"
                                    >
                                        <div className="h-28 bg-slate-100 w-full flex items-center justify-center text-slate-300 relative overflow-hidden">
                                            {product.image_path ? (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            )}
                                        </div>
                                        <div className="p-3 flex flex-col justify-between flex-1">
                                            <div>
                                                <div className="text-xs text-slate-400 mb-1">{product.sku || 'N/A'}</div>
                                                <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 leading-tight">{product.name}</h4>
                                            </div>
                                            <div className="mt-2 flex justify-between items-center">
                                                <span className="text-blue-600 font-bold">Rp {Number(product.price).toLocaleString('id-ID')}</span>
                                                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{product.stock} pcs</span>
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center h-64 text-slate-500">
                                    <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                    <p className="text-lg font-medium">Data produk kosong</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Cart Overlay */}
                {showMobileCart && (
                    <div className="lg:hidden fixed inset-0 bg-slate-900/50 z-30" onClick={() => setShowMobileCart(false)}></div>
                )}

                {/* Right Area: Cart (30%) */}
                <div className={`${showMobileCart ? 'fixed inset-y-0 right-0 w-80 flex shadow-2xl z-40' : 'hidden'} lg:flex lg:relative lg:w-1/3 xl:w-1/4 flex-col h-full bg-white lg:shadow-xl lg:z-20 transition-all`}>
                    <div className="p-4 border-b border-slate-200 bg-slate-800 text-white shrink-0 flex justify-between items-center">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Struk Pesanan
                        </h2>
                        {/* Close button for mobile */}
                        <button onClick={() => setShowMobileCart(false)} className="lg:hidden text-slate-300 hover:text-white">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-2 bg-slate-50">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <p>Keranjang masih kosong</p>
                                <p className="text-sm mt-1 text-slate-300">Pilih menu untuk menambahkan</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {cart.map(item => (
                                    <div key={item.id} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 relative group">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="pr-6">
                                                <h4 className="text-sm font-semibold text-slate-800 leading-tight">{item.name}</h4>
                                                <div className="text-xs text-blue-600 font-medium">Rp {Number(item.price).toLocaleString('id-ID')}</div>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 absolute top-3 right-3 transition-colors">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-blue-600 active:scale-95 transition-all">-</button>
                                                <span className="w-10 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm text-slate-600 hover:text-blue-600 active:scale-95 transition-all">+</button>
                                            </div>
                                            <div className="font-bold text-slate-800">
                                                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary & Actions */}
                    <div className="p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>Subtotal</span>
                                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-sm text-slate-500">
                                <span>PPN (11%)</span>
                                <span>Rp {tax.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-100">
                                <span>Total Tagihan</span>
                                <span>Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Metode Pembayaran</label>
                            <div className="grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => setData('payment_method', 'cash')}
                                    className={`py-2 px-1 text-sm font-medium rounded-md border transition-all ${data.payment_method === 'cash' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    TUNAI
                                </button>
                                <button 
                                    onClick={() => setData('payment_method', 'qris')}
                                    className={`py-2 px-1 text-sm font-medium rounded-md border transition-all ${data.payment_method === 'qris' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    QRIS
                                </button>
                                <button 
                                    onClick={() => setData('payment_method', 'card')}
                                    className={`py-2 px-1 text-sm font-medium rounded-md border transition-all ${data.payment_method === 'card' ? 'bg-blue-50 border-blue-600 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    KARTU
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={cart.length === 0 || processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg border border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <span>Memproses...</span>
                            ) : (
                                <>
                                    <span>BAYAR SEKARANG</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Mobile Cart Toggle button (simplified approach for very narrow screens) */}
                <div className={`lg:hidden absolute bottom-4 right-4 z-20 transition-all duration-300 ${showMobileCart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                     <button onClick={() => setShowMobileCart(true)} className="bg-blue-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative hover:bg-blue-700 active:scale-95 transition-all">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                         {cart.length > 0 && (
                             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                                 {cart.length}
                             </span>
                         )}
                     </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowPaymentModal(false)}></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden flex flex-col transform transition-all">
                        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-800">Pembayaran {data.payment_method.toUpperCase()}</h3>
                            <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        
                        <div className="p-6 flex-1 text-center">
                            <p className="text-sm text-slate-500 font-medium mb-1">Total Tagihan</p>
                            <div className="text-4xl font-black text-blue-600 mb-6">
                                Rp {total.toLocaleString('id-ID')}
                            </div>

                            {data.payment_method === 'cash' ? (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 text-left mb-2">Uang Diterima (Rp)</label>
                                    <input 
                                        type="number" 
                                        autoFocus
                                        value={tenderedAmount}
                                        onChange={(e) => setTenderedAmount(e.target.value)}
                                        className="w-full text-2xl font-bold p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-0 text-slate-800"
                                        placeholder="0"
                                    />
                                    
                                    {/* Quick Amount Buttons */}
                                    <div className="grid grid-cols-4 gap-2 mt-3">
                                        <button onClick={() => setTenderedAmount(total)} className="py-2 bg-slate-100 hover:bg-slate-200 rounded font-medium text-slate-700 text-sm">Pas</button>
                                        <button onClick={() => setTenderedAmount(50000)} className="py-2 bg-slate-100 hover:bg-slate-200 rounded font-medium text-slate-700 text-sm">50k</button>
                                        <button onClick={() => setTenderedAmount(100000)} className="py-2 bg-slate-100 hover:bg-slate-200 rounded font-medium text-slate-700 text-sm">100k</button>
                                        <button onClick={() => setTenderedAmount(Number(tenderedAmount) + 10000)} className="py-2 bg-slate-100 hover:bg-slate-200 rounded font-medium text-slate-700 text-sm">+10k</button>
                                    </div>

                                    {/* Change Calculation */}
                                    <div className={`mt-6 p-4 rounded-xl text-left ${Number(tenderedAmount) >= total ? 'bg-green-50 border border-green-100' : 'bg-slate-50 border border-slate-100'}`}>
                                        <p className="text-sm font-medium text-slate-500 mb-1">Uang Kembalian</p>
                                        <p className={`text-2xl font-bold ${Number(tenderedAmount) >= total ? 'text-green-600' : 'text-slate-400'}`}>
                                            Rp {Number(tenderedAmount) >= total ? (Number(tenderedAmount) - total).toLocaleString('id-ID') : '0'}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8 bg-blue-50 border border-blue-100 rounded-xl">
                                    <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                    <p className="font-semibold text-blue-800">Menunggu Pembayaran {data.payment_method.toUpperCase()}</p>
                                    <p className="text-sm text-blue-600 mt-2 px-4">Pastikan pelanggan telah melakukan scan atau tapping sebelum mengonfirmasi.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
                            <button onClick={() => setShowPaymentModal(false)} className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 active:scale-95 transition-all">
                                Batal
                            </button>
                            <button 
                                onClick={submitPayment}
                                disabled={processing || (data.payment_method === 'cash' && Number(tenderedAmount) < total)}
                                className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                {processing ? 'Memproses...' : 'Selesaikan Pembayaran'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PosLayout>
    );
}
