import type { Metadata } from 'next';
import { Work_Sans, Open_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  variable: '--font-work-sans',
  subsets: ['latin'],
});
const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'This is my personal website.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${workSans.variable} ${openSans.variable} `}>
        {children}
      </body>
    </html>
  );
}
