const STEPS = [
    {
        step: '01',
        title: 'Daftar Akun',
        desc: 'Buat akun gratis dalam 30 detik. Tidak perlu kartu kredit, tidak ada biaya tersembunyi.',
    },
    {
        step: '02',
        title: 'Input Produk',
        desc: 'Tambahkan produk, harga, dan stok Anda. Bisa impor dari Excel atau tambah satu per satu.',
    },
    {
        step: '03',
        title: 'Mulai Jualan',
        desc: 'Akses halaman kasir dan mulai proses transaksi pertama Anda. Semudah itu!',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-28 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-violet-400 font-semibold text-sm uppercase tracking-widest">Cara Kerja</span>
                    <h2 className="text-4xl md:text-5xl font-black mt-3 mb-4">Setup Dalam 3 Langkah Mudah</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector line — desktop only */}
                    <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

                    {STEPS.map((item) => (
                        <div key={item.step} className="text-center relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center mx-auto mb-6 text-2xl font-black shadow-lg shadow-violet-500/30">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
