import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bet sports app",
  description: "Bet sports ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`} >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
