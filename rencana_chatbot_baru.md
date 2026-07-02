# Rencana Pembangunan Proyek: Chatbot Elektro SMK (Standalone Chatbot App)

Dokumen ini berisi cetak biru (*blueprint*), arsitektur file, dan panduan pembuatan aplikasi Chatbot khusus materi Kelistrikan SMK berbasis Next.js 15+ dan Gemini AI.

---

## 🎨 Konsep & Desain Antarmuka (Full-Screen Workspace)

Berbeda dengan microsite sebelumnya, aplikasi baru ini dirancang sebagai **satu halaman penuh (Full-Screen Chat UI)** mirip ChatGPT/Claude, dengan susunan tata letak:
1. **Sidebar Kiri (Riwayat Obrolan)**:
   - Tombol "Obrolan Baru (New Chat)".
   - Daftar riwayat percakapan yang disimpan otomatis di penyimpanan lokal (*localStorage*).
   - Profil Pengguna (Siswa SMK) & tautan panduan singkat di bagian bawah.
2. **Area Utama Kanan (Workspace Chat)**:
   - Header: Nama chatbot, indikator status server, dan informasi sisa kuota harian.
   - Body: Kontainer gelembung obrolan (*scrollable chat bubbles*) dengan dukungan rendering Markdown yang rapi untuk rumus/daftar langkah.
   - Footer: Area input fleksibel menggunakan `<textarea>` yang bisa membesar ke atas, tombol lampiran berkas (multimodal), pratinjau media sebelum dikirim, dan tombol kirim.

---

## 📁 Struktur Folder & Arsitektur File

Berikut rancangan struktur proyek Next.js yang bersih dan modular:

```text
chatbot-elektro/
├── .env.local                    # Menyimpan API Key (GITIGNORED)
├── .gitignore
├── package.json
├── jsconfig.json
├── next.config.mjs
├── public/
│   ├── icon.svg                  # Icon logo bohlam sirkuit
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js             # Global layout (Font Poppins)
│   │   ├── globals.css           # Sistem desain terpadu & transisi
│   │   ├── page.js               # Halaman utama Full-screen Chat
│   │   └── api/
│   │       └── chat/
│   │           └── route.js      # Backend handler streamText Gemini
│   ├── components/
│   │   ├── Sidebar.jsx           # Panel riwayat obrolan di kiri
│   │   ├── ChatContainer.jsx     # Area pesan & scrolling otomatis
│   │   ├── ChatMessage.jsx       # Bubble chat (Markdown, Lampiran Media)
│   │   └── ChatInput.jsx         # Textarea input, attachment, & send
│   └── lib/
│       ├── chatLimit.js          # Pembatas kuota harian per device
│       └── utils.js              # Helper format tanggal & ID
```

---

## 🔧 Konsep Implementasi Teknis

### 1. API Route (`src/app/api/chat/route.js`)
Menggunakan **Vercel AI SDK** untuk mengalirkan teks secara langsung (*streaming response*) dari model **Gemini 2.5 Flash**:
- Mengamankan API key di level server menggunakan `process.env.GOOGLE_GENERATIVE_AI_API_KEY`.
- Memproses pesan teks serta menganalisis input media (gambar & audio) yang diunggah siswa.
- Menerapkan *System Prompt* spesifik untuk membatasi kepribadian AI sebagai Guru TITL (Teknik Instalasi Tenaga Listrik) SMKN 4 Semarang.

### 2. Riwayat Obrolan Lokal (Chat History Management)
- Riwayat percakapan disimpan ke *localStorage* berformat JSON array:
  ```json
  [
    {
      "id": "thread-1",
      "title": "Membahas Hukum Ohm",
      "messages": [ ... ]
    }
  ]
  ```
- Ketika siswa membuka kembali web, Sidebar kiri akan me-load seluruh `thread` yang pernah mereka buat.

### 3. Keamanan Kuota (Daily Rate Limiter)
- Tetap membatasi pemakaian **15 pesan per device per hari** (disimpan di *localStorage*) agar kuota API gratisan tidak habis/terkena limit harian.

---

## ⚙️ Panduan Setup & Instalasi Proyek Baru

Ikuti langkah-langkah berikut untuk memulai pembuatan proyek:

### Langkah 1: Inisialisasi Project Next.js Baru
Buka terminal dan buat project di direktori baru:
```bash
npx create-next-app@latest ./ --js --app --no-tailwind --eslint --src-dir --import-alias "@/*"
```
*(Catatan: Pilih opsi di atas agar struktur file sama dengan template kita).*

### Langkah 2: Install Dependensi yang Dibutuhkan
Instal Vercel AI SDK dan library ikon:
```bash
npm install ai @ai-sdk/google lucide-react react-markdown
```

### Langkah 3: Konfigurasi API Key
Buat file `.env.local` di folder root project baru tersebut, lalu isi dengan API Key baru yang telah kamu siapkan:
```env
GOOGLE_GENERATIVE_AI_API_KEY=YOUR_GEMINI_API_KEY
```
> ⚠️ **PENTING**: Pastikan file `.env.local` masuk ke dalam daftar `.gitignore` sebelum melakukan push ke GitHub agar API Key ini tidak terdeteksi oleh bot scanner publik atau diblokir oleh GitHub Push Protection.

### Langkah 4: Copy & Paste Logika Inti
Kamu tinggal menyalin komponen `route.js`, `chatLimit.js`, dan antarmuka input textarea dari proyek `microlearn_ai` yang sudah kita perbaiki dan optimalkan di sesi sebelumnya!
