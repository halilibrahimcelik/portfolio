import type { Metadata } from 'next';
import { Work_Sans, Open_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import BgIcon from '@/components/icons/BgIcon';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import { ApolloClientProvider } from '@/providers/ApolloContextProvider';

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
        <ApolloClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <div className='relative h-full'>
              {children}

              <BgIcon />
            </div>
            <Toaster
              className='![--width:250px]  '
              position='bottom-center'
              visibleToasts={2}
              duration={1500}
            />
          </ThemeProvider>
          <NextTopLoader
            color='#2299DD'
            initialPosition={0.08}
            crawlSpeed={200}
            height={2}
            showSpinner={false}
            crawl={true}
            easing='ease'
            speed={200}
            shadow='0 0 10px #2299DD,0 0 5px #2299DD'
            zIndex={1600}
            showAtBottom={false}
          />
        </ApolloClientProvider>
      </body>
    </html>
  );
}
