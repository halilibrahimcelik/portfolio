import type { Metadata } from 'next';
import { Rubik, Rubik_Mono_One } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import BgIcon from '@/components/icons/BgIcon';
import { Toaster } from '@/components/ui/sonner';
import NextTopLoader from 'nextjs-toploader';
import { ApolloClientProvider } from '@/providers/ApolloContextProvider';
import { PostHogProvider } from '@/providers/PosthogProvider';

const rubikFont = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
});
const rubikMonoOneFont = Rubik_Mono_One({
  variable: '--font-rubik-mono',
  subsets: ['latin'],
  weight: '400',
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
      <body className={`${rubikFont.variable} ${rubikMonoOneFont.variable} `}>
        <ApolloClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <div className='relative min-h-screen'>
              <PostHogProvider>{children}</PostHogProvider>

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
            zIndex={1600}
            showAtBottom={false}
          />
        </ApolloClientProvider>
      </body>
    </html>
  );
}
