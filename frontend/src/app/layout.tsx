import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/main/navbar";
import Footer from "@/app/ui/main/footer";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '900'] });

export const metadata: Metadata = {
  title: "Github Wrapped App",
  description: "It connects directly to GitHub's platform using the user's Personal Access Token (Classic), providing detailed insights into user activity across both public and private repositories. The App ensures high performance, security, and transparency, without storing sensitive user data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
