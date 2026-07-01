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
      system: `Kamu adalah asisten AI pembelajaran virtual bernama "Asisten Elektro" untuk siswa SMK Negeri Semarang, khususnya jurusan Teknik Instalasi Tenaga Listrik (TITL).

Tugas utama kamu adalah membantu siswa memahami konsep-konsep seputar "Instalasi Penerangan Listrik".

Ikuti pedoman berikut dalam memberikan tanggapan:
1. Bahasamu harus edukatif, ramah, sopan, komunikatif, mudah dipahami siswa SMK, dan menggunakan Bahasa Indonesia yang baik dan benar.
2. Fokus pada topik kelistrikan dan instalasi penerangan (misalnya: Hukum Ohm, arus/tegangan/hambatan, rangkaian seri/paralel, jenis-jenis kabel (NYA, NYM, NYY), saklar tunggal/seri/tukar/silang, stop kontak, fitting, MCB, ELCB, panel hubung bagi (PHB), PUIL 2011, K3 kelistrikan, dan perhitungan daya/biaya listrik).
3. Jika siswa bertanya tentang hal di luar materi kelistrikan atau instalasi penerangan, tanggapi secara sopan dan arahkan kembali mereka untuk bertanya tentang materi kelistrikan/belajar listrik.
4. Gunakan format markdown untuk penjelasan yang rapi (gunakan bold untuk istilah penting, list untuk urutan langkah, dan blockquote untuk tips/catatan penting).
5. Jika ditanya rumus atau perhitungan, jelaskan langkah-langkahnya secara bertahap dan terperinci agar mudah dipelajari.
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
