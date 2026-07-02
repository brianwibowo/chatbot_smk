import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "SmartIML AI — Chatbot Instalasi Motor Listrik SMK",
  description:
    "Asisten AI untuk membantu siswa-siswi XI TITL SMKN 4 Semarang memahami materi Instalasi Motor Listrik (TITL). Belajar rangkaian DOL, Star-Delta, dan kontrol motor listrik dengan mudah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={publicSans.variable}>
      <body>{children}</body>
    </html>
  );
}

