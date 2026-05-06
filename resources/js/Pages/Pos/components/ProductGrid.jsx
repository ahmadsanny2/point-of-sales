/**
 * ProductGrid — Menampilkan area pencarian, filter kategori, dan grid produk.
 *
 * Props:
 * @param {Array}    categories      - Daftar kategori produk
 * @param {Array}    filteredProducts - Produk yang sudah difilter
 * @param {string}   activeCategory  - ID kategori yang sedang aktif
 * @param {Function} setActiveCategory
 * @param {string}   searchQuery
 * @param {Function} setSearchQuery
 * @param {object}   flash           - Flash messages dari server
 * @param {Function} addToCart       - Callback untuk menambah produk ke keranjang
 */
export default function ProductGrid({
    categories,
    filteredProducts,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    flash,
    addToCart,
    onOpenHistory,
    onSearchSubmit,
    pagination,
    onPageChange,
}) {
    return (
        <div className="flex flex-col w-full h-full border-r transition-colors lg:w-2/3 xl:w-3/4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
            {/* ── Search & Category Bar ── */}
            <div className="p-4 bg-white border-b transition-colors dark:bg-slate-800 border-slate-200 dark:border-slate-700 shrink-0">
                {/* Search Input & History Button */}
                <div className="flex gap-3 mb-4">
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSearchSubmit(searchQuery);
                        }}
                        className="relative flex-1"
                    >
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg
                                className="w-5 h-5 text-slate-400 dark:text-slate-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="block py-3 pr-3 pl-10 w-full rounded-lg border transition-all border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Cari nama produk atau SKU... (Enter)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    
                    <button 
                        onClick={onOpenHistory}
                        className="p-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 group shadow-sm"
                        title="Riwayat Transaksi"
                    >
                        <svg className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="hidden sm:inline font-bold text-sm">Riwayat</span>
                    </button>
                </div>

                {/* Category Pills */}
                <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-none">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
                            activeCategory === "all"
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                    >
                        Semua Produk
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
                                activeCategory === cat.id
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Product Grid ── */}
            <div className="overflow-y-auto flex-1 p-4">
                <div className="grid grid-cols-2 gap-4 pb-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:pb-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))
                    ) : (
                        <EmptyProductState />
                    )}
                </div>

                {/* Pagination Controls */}
                {pagination && pagination.last_page > 1 && (
                    <div className="flex justify-between items-center mt-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                        <button 
                            disabled={!pagination.prev_page_url}
                            onClick={() => onPageChange(pagination.prev_page_url)}
                            className="px-4 py-2 text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                            Sebelumnya
                        </button>
                        
                        <span className="text-xs font-bold text-slate-500">
                            Hal {pagination.current_page} dari {pagination.last_page}
                        </span>

                        <button 
                            disabled={!pagination.next_page_url}
                            onClick={() => onPageChange(pagination.next_page_url)}
                            className="px-4 py-2 text-sm font-bold rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-30 enabled:hover:bg-slate-50 dark:enabled:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                            Berikutnya
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Private Sub-components ───────────────────────────────────────────────────

/** Kartu satu produk dalam grid. */
function ProductCard({ product, onAddToCart }) {
    return (
        <div className="flex overflow-hidden flex-col text-left bg-white rounded-xl border shadow-sm transition-all group dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-500">
            {/* Product Image */}
            <div className="flex overflow-hidden relative justify-center items-center w-full h-32 lg:h-52 xl:h-32 bg-slate-100 dark:bg-slate-700 text-slate-300 dark:text-slate-500">
                {product.image_path ? (
                    <img
                        src={`/storage/${product.image_path}`}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                    />
                ) : (
                    <svg
                        className="w-10 h-10 opacity-30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-1 justify-between p-3">
                <div>
                    <div className="mb-1 text-xs text-slate-400 dark:text-slate-500">
                        {product.sku || "N/A"}
                    </div>
                    <h4 className="text-sm font-semibold leading-tight text-slate-800 dark:text-slate-100 line-clamp-2">
                        {product.name}
                    </h4>
                </div>
                <div className="flex justify-between items-end mt-3">
                    <div>
                        <span className="block mb-1 font-bold text-blue-600 dark:text-blue-400">
                            Rp {Number(product.price).toLocaleString("id-ID")}
                        </span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">
                            {product.stock} pcs
                        </span>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex-shrink-0 p-2 text-blue-600 bg-blue-50 rounded-lg transition-colors dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-600 hover:text-white active:scale-95"
                        title="Tambah ke Keranjang"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Tampilan kosong ketika tidak ada produk yang ditemukan. */
function EmptyProductState() {
    return (
        <div className="flex flex-col col-span-full justify-center items-center h-64 text-slate-500 dark:text-slate-400">
            <svg
                className="mb-4 w-16 h-16 text-slate-300 dark:text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
            <p className="text-lg font-medium">Data produk kosong</p>
        </div>
    );
}
