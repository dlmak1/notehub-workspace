import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import "modern-normalize/modern-normalize.css";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NoteHub | Personal Notes Workspace",
    template: "%s | NoteHub",
  },
  description:
    "Keep your notes organized in one place. Create an account, save ideas, search notes, and organize everything with tags.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <div className="page-content">{children}</div>
            {modal}
            <Footer />
            <Toaster />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
