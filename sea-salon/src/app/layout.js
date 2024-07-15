import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppProvider from "@/components/AppContext";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "SEASalon",
  description: "A salon management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className} >
        <AppProvider>
          <Navbar/>
          <main className="flex flex-col min-h-screen min-w-screen items-center p-[10px]">
            {children}
          </main>
          <Footer/>
        </AppProvider>
      </body>
    </html>
  );
}
