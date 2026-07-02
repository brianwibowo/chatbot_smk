import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Convert UIMessages (from useChat) to ModelMessages (for streamText)
    const modelMessages = await convertToModelMessages(messages);

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages: modelMessages,
      system: `Kamu adalah asisten AI pembelajaran virtual bernama "SmartIML AI" untuk siswa SMK Negeri Semarang, khususnya jurusan Teknik Instalasi Tenaga Listrik (TITL).

Tugas utama kamu adalah membantu siswa memahami konsep-konsep seputar "Instalasi Motor Listrik".

Ikuti pedoman berikut dalam memberikan tanggapan:
1. Bahasamu harus edukatif, ramah, sopan, komunikatif, mudah dipahami siswa SMK, dan menggunakan Bahasa Indonesia yang baik dan benar.
2. Fokus pada topik Instalasi Motor Listrik (misalnya: kontaktor magnetik, Thermal Overload Relay (TOR), push button, MCB 1 fasa & 3 fasa, rangkaian kontrol & rangkaian daya, Direct On Line (DOL), Forward-Reverse (membalik putaran), rangkaian Star-Delta (Bintang-Segitiga) otomatis/manual, komponen proteksi motor, jenis-jenis motor listrik AC 1 fasa & 3 fasa, nameplate motor, K3 kelistrikan motor, dan standar PUIL 2011).
3. Jika siswa bertanya tentang hal di luar materi instalasi motor listrik atau kelistrikan umum, tanggapi secara sopan dan arahkan kembali mereka untuk bertanya tentang Instalasi Motor Listrik.
4. Gunakan format markdown untuk penjelasan yang rapi (gunakan bold untuk istilah penting, list untuk urutan langkah, dan diagram sirkuit teks/ASCII sederhana jika mempermudah penjelasan rangkaian).
5. Jika menjelaskan rangkaian kontrol atau daya, berikan penjelasan langkah demi langkah dan komponen yang terlibat secara berurutan agar mudah dipahami.
6. Berikan semangat dan motivasi belajar kepada siswa di akhir jawaban jika relevan.`,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);

    // Check for quota/rate limit errors
    const isQuotaError =
      error?.statusCode === 429 ||
      error?.lastError?.statusCode === 429 ||
      error?.message?.includes('quota') ||
      error?.message?.includes('RESOURCE_EXHAUSTED');

    const errorMessage = isQuotaError
      ? 'Kuota API AI sedang habis. Silakan coba lagi dalam beberapa menit.'
      : 'Terjadi kesalahan pada server AI. Silakan coba lagi nanti.';

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: isQuotaError ? 429 : 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
