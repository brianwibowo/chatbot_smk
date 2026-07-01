import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Asisten Elektro — Chatbot Materi Kelistrikan SMK",
  description:
    "Asisten AI untuk membantu siswa SMK Negeri Semarang memahami materi Instalasi Penerangan Listrik (TITL). Belajar Hukum Ohm, rangkaian listrik, dan K3 kelistrikan dengan mudah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={publicSans.variable}>
      <body>{children}</body>
    </html>
  );
}

