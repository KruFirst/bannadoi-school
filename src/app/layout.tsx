import type { Metadata } from "next";
import "./globals.css";
import AnnouncementTicker from "@/components/AnnouncementTicker";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import GlobalSearchModal from "@/components/GlobalSearchModal";
import { schoolInfo } from "@/data/schoolData";

export const metadata: Metadata = {
  metadataBase: new URL('https://bannadoi-school.vercel.app'),
  title: `${schoolInfo.nameTh} (${schoolInfo.nameEn}) | สพป.แม่ฮ่องสอน เขต 2`,
  description: `${schoolInfo.nameTh} ${schoolInfo.affiliation} ${schoolInfo.philosophy}`,
  keywords: [
    "โรงเรียนบ้านนาดอย",
    "สพป.แม่ฮ่องสอน เขต 2",
    "สพฐ",
    "อำเภอสบเมย",
    "การศึกษาขั้นพื้นฐาน",
    "ITA โรงเรียน",
    "OIT 2569",
    "แม่ฮ่องสอน",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${schoolInfo.nameTh} | ${schoolInfo.affiliation}`,
    description: schoolInfo.philosophy,
    siteName: schoolInfo.nameTh,
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: `${schoolInfo.nameTh} Logo`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body className="flex flex-col min-h-screen antialiased text-slate-800 bg-[#fcfdfd]">
        <AnnouncementTicker />
        <Navbar />
        <main className="flex-grow print:p-0 print:m-0 print:block">{children}</main>
        <Footer />
        <div className="print:hidden">
          <AccessibilityWidget />
          <GlobalSearchModal />
        </div>
      </body>
    </html>
  );
}
