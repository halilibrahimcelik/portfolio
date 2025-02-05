import type { Metadata } from 'next';
import { Work_Sans, Open_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/ThemeProvider';
import BgIcon from '@/components/icons/BgIcon';

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${workSans.variable} ${openSans.variable} `}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='relative min-h-screen'>
            {children}
            <div className='absolute z-[-1] top-0 left-0  bottom-0 w-full h-full'>
              <BgIcon />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
