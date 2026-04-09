# Design System - Point of Sales (POS)

## 1. Overview & Philosophy
Sistem desain ini dirancang untuk aplikasi POS serbaguna yang responsif di seluruh perangkat dengan mengedepankan estetika **Modern & Elegan**. Terinspirasi dari antarmuka *Kiosk*, desainnya difokuskan pada area sentuh (tap-targets) yang besar, interaksi yang minim friksi, dan navigasi yang intuitif.

Terdapat pemisahan pengalaman antara *roles* Admin (fokus pada analisis data & manajemen) dan Staff (fokus pada operasional transaksi cepat).

---

## 2. Design Tokens (Pondasi)

### 2.1. Color Palette (Palet Warna)
- **Primary:** `#2563EB` (Royal Blue) - Elegan, terpercaya, modern. Digunakan untuk aksi utama.
- **Secondary:** `#1E293B` (Slate Dark) - Warna brand sekunder yang solid.
- **Accent/Highlight:** `#38BDF8` (Sky Blue) - Untuk status aktif atau interaksi hover.
- **Backgrounds:**
  - `bg-app`: `#F8FAFC` (Terang, bersih untuk keseluruhan aplikasi)
  - `bg-surface`: `#FFFFFF` (Warna putih murni untuk kartu/komponen)
  - `bg-sidebar`: `#0F172A` (Biru dongker pekat khusus untuk layout Admin yang elegan)
- **Text:**
  - `text-primary`: `#0F172A` (Warna gelap pekat untuk keterbacaan tinggi)
  - `text-secondary`: `#64748B` (Abu-abu kebiruan untuk label atau deskripsi)
- **Semantic/System:**
  - `success`: `#10B981` (Hijau untuk transaksi sukses)
  - `danger`: `#EF4444` (Merah muda untuk pembatalan/hapus)
  - `warning`: `#F59E0B` (Kuning/Oranye untuk peringatan stok rendah)

### 2.2. Typography (Tipografi)
Menggunakan *font sans-serif* yang modern dan sangat bersih pada resolusi tinggi (Rekomendasi: **Inter**, **Satoshi**, atau **Plus Jakarta Sans**).
- **Heading 1 (H1):** 36px / Bold / Kiosk Titles & Dashboard Main
- **Heading 2 (H2):** 28px / Semi-Bold / Section Titles
- **Heading 3 (H3):** 20px / Medium / Card Titles
- **Body Large:** 18px / Regular / Kiosk interface text (Lebih besar demi kemudahan *tap* di layar sentuh)
- **Body Regular:** 14px - 16px / Regular / Admin Dashboard text & Tables
- **Caption:** 12px / Regular / Metadata, timestamps

### 2.3. Spacing & Sizing (Spasi & Ukuran)
Pendekatan skala 4px (`4-point grid system`) untuk konsistensi jarak.
- `xs`: 4px
- `sm`: 8px
- `md`: 16px (Spacing standar komponen panel)
- `lg`: 24px (Spacing antar section besar)
- `xl`: 32px
- **Touch Target Minimum:** `48px` x `48px` (Aturan emas Kiosk UI agar jari tidak meleset saat interaksi layar sentuh)

### 2.4. Radius & Shadows
- **Border Radius:**
  - `sm`: 6px (Kolom Input, Checkbox, Badge)
  - `md`: 12px (Tombol Kiosk, Kartu Produk - memberi nuansa modern/soft elegan)
  - `lg`: 24px (Modals & Pop-ups)
- **Shadows:**
  - `shadow-sm`: Bayangan sangat ringan untuk elemen *floating* kecil.
  - `shadow-lg`: Untuk Modal dan Panel agar tampak mengangkat (*elevation*) memberi kesan dimensional.

---

## 3. Responsive Grid & Breakpoints

- **Mobile (< 768px):** 1-column layout. Sidebar tersembunyi di balik *Hamburger menu*. Menggunakan bottom-navigation tab untuk Staff UI. Fitur Admin pada mode ini dioptimalkan menjadi bentuk *Card/List* (bukan tabel utuh).
- **Tablet/Kiosk (768px - 1024px):** Fokus utama ruang operasional POS. Layar terbagi. Untuk layar Staff/Kasir, area kiri digunakan untuk menu produk (70%), area kanan untuk *Cart/Struk* pembayaran (30%).
- **Desktop/Large (> 1024px):** 12-kolom grid. Optimal untuk Admin. Memiliki Sidebar menu tetap (Fixed) di sebelah kiri, memberi ruang luas untuk Tabel Data yang kompleks dan Dashboard Chart.

---

## 4. Key Components (Komponen UI)

### 4.1. Buttons (Tombol)
Sesuai nuansa Kiosk, tombol dibuat bongsor dengan tinggi minimum 48px pada area sentuh.
- **Primary Button:** Latar belakang biru `#2563EB`, teks putih, font Medium. Digunakan untuk aksi "Bayar", "Simpan", "Lanjutkan".
- **Secondary Button:** Latar belakang transparan atau abu-abu terang, outline halus.
- **Kiosk Action Button / Numpad:** Kotak besar berukuran presisi (biasa rasio 1:1) dengan sudut `12px` untuk Digital Numpad atau Kategori Produk.

### 4.2. Cards (Kartu Produk & Statistik)
- **Product Card (Kiosk):** Area visual produk (ikon/foto) mendominasi, sudut membulat. Tidak butuh tombol tumpang tindih; **menekan seluruh kartu akan langsung menambahkan pesanan** (perilaku umum Kiosk).
- **Data/Stat Card (Admin):** Minimalis. Judul kecil, metrik angka super besar, dihiasi dengan mini grafik *sparkline* yang berwarna halus.

### 4.3. Inputs & Forms
- Gaya form yang elegan: Label berada tepat di luar field.
- **Kiosk Mode Input:** Untuk Search Menu / Input Nominal di layar sentuh Staff, akan memicu **Virtual/On-Screen Numpad** di bagian bawah tanpa bergantung pada keyboard sistem yang memakan banyak layar.

### 4.4. Tables & Data Management (Khusus Admin)
- Baris (row) tabel yang lapang (vertical padding 16px).
- Aksi baris (Edit/Hapus) menggunakan ikon kecil yang terpusat rapi di kolom paling kanan.
- *Status Badge:* Label berwarna untuk merepresentasikan status (misal: "Lunas" badge hijau muda transparan dengan tulisan hijau pekat).

---

## 5. Layout & Role Access

### 5.1. Staff / Cashier Interface (Kiosk Mode)
- **Tujuan Utama:** Kecepatan, akurasi, layar sentuh.
- **Elemen:**
  - **Upper Bar / Kategori:** Filter tab besar yang bisa direkam/geser (horizontal scroll) dengan jari.
  - **Main Display:** Grid kartu item produk.
  - **Cart Panel (Fixed Kanan / Bottom Sheet untuk Mobile):** Menampilkan rincian order, PPN yang dihitung otomatis, subtotal, dan satu tombol 'Checkout' atau 'Bayar' yang sangat mendominasi penglihatan.

### 5.2. Admin Dashboard Management
- **Tujuan Utama:** Pemantauan dan pengaturan mendalam (fokus untuk pemakaian mouse/desktop).
- **Elemen:**
  - **Sidebar Navigasi Gelap:** Menampung menu: Beranda Dashboard, Manajemen Produk, Manajemen Stok, Data Transaksi, dan Pengaturan Akses Karyawan (Staff).
  - **Main Content Area:** Canvas putih bersih dengan susunan *card* atau bagan pelaporan, dan *Data Table* yang dilengkapi fitur pencarian, filter rentang tanggal, hingga export (CSV/Excel).
