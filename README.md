# SmartIML AI ⚡
> Chatbot Pintar Pembelajaran Virtual Materi **Instalasi Motor Listrik** untuk Siswa SMK Negeri Semarang, Jurusan Teknik Instalasi Tenaga Listrik (TITL) Kelas XI (Fase F).

SmartIML AI dirancang khusus untuk mempermudah siswa memahami materi kelistrikan motor, komponen mekanis pengendali, jenis diagram gambar listrik, dan 8 rangkaian kendali elektromagnetik (seperti Direct On Line, Star-Delta, dan Forward-Reverse) secara interaktif menggunakan kecerdasan buatan.

---

## 🚀 Fitur Utama

- 🧠 **Guru IML Virtual Spesifik**: AI dibatasi khusus untuk menjawab kurikulum Instalasi Motor Listrik dan kelistrikan umum TITL (mencegah jawaban keluar jalur).
- 🎨 **Full-Screen Chat UI**: Antarmuka responsif mirip ChatGPT/Claude dengan transisi warna halus.
- 🌓 **Tema Terang & Gelap**: Default menggunakan Light Theme bersih, dengan opsi beralih ke Dark Theme listrik listrik orisinal. Pilihan tema disimpan otomatis di `localStorage`.
- 📁 **Manajemen Riwayat Obrolan**: Seluruh riwayat obrolan/thread disimpan di lokal perangkat siswa sehingga data tidak hilang saat halaman dimuat ulang.
- 📎 **Masukan Multimodal (Gambar)**: Siswa dapat melampirkan foto skema diagram rangkaian atau catatan untuk dianalisis oleh AI.
- 📋 **Tombol Salin (Copy Button)**: Mempermudah siswa menyalin penjelasan terminal komponen atau langkah pengawatan rangkaian kendali ke buku catatan digital mereka.
- 🛡️ **Pembatas Kuota Harian**: Fitur keamanan membatasi kuota penggunaan maksimal 15 pesan per device per hari demi efisiensi kuota API.

---

## 🛠️ Tech Stack

| Teknologi / Pustaka | Deskripsi Fungsi |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework utama pengembangan web |
| **Vercel AI SDK** | Pustaka untuk menangani streaming respon teks dari model AI |
| **Google Gemini 2.5 Flash** | Otak asisten pintar (menjawab teks & menganalisis gambar) |
| **Public Sans** | Font Google utama untuk keterbacaan tingkat tinggi |
| **Lucide React** | Pustaka ikon antarmuka web |
| **React Markdown** | Merender teks markdown AI secara terstruktur dan rapi |
| **LocalStorage** | Penyimpanan lokal untuk riwayat chat, pilihan tema, dan kuota harian |

---

## ⚙️ Panduan Menjalankan Secara Lokal

Ikuti langkah-langkah berikut untuk memulai dan menguji aplikasi di komputer lokal Anda:

### 1. Klon Repositori
```bash
git clone https://github.com/brianwibowo/chatbot_smk.git
cd chatbot_smk
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Buat file bernama `.env.local` di folder root proyek ini, lalu isi dengan API Key Gemini Anda:
```env
GOOGLE_GENERATIVE_AI_API_KEY=MASUKKAN_API_KEY_GEMINI_ANDA
```
*Catatan: File `.env.local` sudah otomatis terdaftar di `.gitignore` untuk mencegah kebocoran kunci API ke publik.*

### 4. Jalankan Server Pengembangan
```bash
npm run dev
```
Setelah berjalan, buka halaman **http://localhost:3000** di web browser Anda.

---

## 📁 Struktur Folder Utama

```text
chatbot_smk/
├── docs/                         # Folder modul ajar resmi IML
├── public/                       # Aset statis (Logo, Icon)
├── src/
│   ├── app/
│   │   ├── api/chat/route.js     # Backend handler streamText Gemini
│   │   ├── globals.css           # Sistem desain terpadu & transisi tema
│   │   ├── layout.js             # Layout dasar dengan font Public Sans
│   │   └── page.js               # Halaman utama aplikasi (Full-Screen Chat)
│   ├── components/
│   │   ├── Sidebar.jsx           # Panel riwayat obrolan di kiri & toggle tema
│   │   ├── ChatContainer.jsx     # Area pesan & scrolling otomatis
│   │   ├── ChatMessage.jsx       # Bubble chat (Markdown, Lampiran, Copy Button)
│   │   └── ChatInput.jsx         # Input teks, lampiran file, & proteksi kuota
│   └── lib/
│       ├── chatLimit.js          # Pengelola pembatas kuota harian per device
│       └── utils.js              # Helper format waktu & generator ID
```

---

## 🌐 Panduan Deployment di Vercel

Aplikasi ini siap di-hosting langsung melalui platform Vercel Cloud:

1. Hubungkan akun GitHub Anda di [Vercel Dashboard](https://vercel.com).
2. Lakukan **Import** proyek repositori `chatbot_smk`.
3. Pada tab **Environment Variables**, tambahkan:
   - **Key**: `GOOGLE_GENERATIVE_AI_API_KEY`
   - **Value**: *(Kunci API Gemini Anda)*
4. Klik **Deploy**.

### Menghubungkan Domain Kustom (`smartiml-ai.my.id`)
1. Masuk ke halaman **Settings > Domains** pada proyek Anda di Vercel.
2. Tambahkan domain kustom Anda: `smartiml-ai.my.id`.
3. Lakukan konfigurasi DNS (CNAME/A Record) pada registrar domain Anda sesuai instruksi dari Vercel.
4. *Saran UX*: Lakukan edit pada domain bawaan Vercel (`*.vercel.app`) dan setel **Redirect to** mengarah langsung ke `smartiml-ai.my.id` demi performa SEO yang optimal.

