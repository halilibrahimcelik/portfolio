import MainMenusCard from '@/components/MainMenusCard/MainMenusCard';
import { Heading, Text } from '@/components/theme/typography';
import TickerItem from '@/components/Ticker/TickerItem';
import client from '@/lib/apolloClient';
import { FETCH_TECH_STACKS, StacksCollection } from '@/lib/queries';
import { CircleGauge, CodeXml, Component, Globe } from 'lucide-react';
import { Metadata, NextPage } from 'next';
import dynamic from 'next/dynamic';
const AnimatedMainMenusCard = dynamic(
  () => import('@/components/AnimateComponent/AnimateComponent'),
  {
    ssr: true, // If animation only matters client-side
  }
);
const TickerCarousel = dynamic(() => import('@/components/Ticker/Ticker'), {
  ssr: true,
});
export const metadata: Metadata = {
  title: 'Halil Ibrahim Celik | Frontend Developer',
  description:
    'Creating seamless user interfaces and specializing in building dynamic, user-friendly web applications with Next.js, React, TypeScript and modern JavaScript.',
  keywords: [
    'Halil Ibrahim Celik',
    'Frontend Developer',
    'Web Developer',
    'Next.js Developer',
    'React Developer',
    'JavaScript Expert',
    'TypeScript',
    'London Web Developer',
    'UI Developer',
    'Frontend Engineer',
    'Web Performance',
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://halilibrahim.dev',
    siteName: 'Halil Ibrahim Celik | Frontend Developer',
    title: 'Halil Ibrahim Celik | Frontend Developer Portfolio',
    description:
      'London-based Frontend Developer specializing in Next.js, React, and TypeScript',
    images: [
      {
        url: 'https://halilibrahim.dev/logo.png',
        width: 150,
        height: 150,
        alt: 'Halil Ibrahim Celik - Frontend Developer Portfolio',
      },
    ],
  },

  alternates: {
    canonical: 'https://halilibrahim.dev',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const HomePage: NextPage = async () => {
  const { data } = await client.query<StacksCollection>({
    query: FETCH_TECH_STACKS,
    fetchPolicy: 'cache-first',
  });
  const technologies = data?.stacksCollection.items.map((stack) => (
    <a href={stack.stackUrl} target='_blank' key={stack.label}>
      <TickerItem title={stack.label} imgUrl={stack.image.url} />{' '}
    </a>
  ));

  return (
    <>
      <AnimatedMainMenusCard
        initial={{ y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3 }}
      >
        <Heading variant='h2'>A Bit About Me</Heading>
        <hr className='mt-1 mb-4' />
        <div className='flex flex-col gap-2'>
          <Text>
            Hi there! I&apos;m Halil Ibrahim Celik, a passionate and
            detail-oriented Frontend Developer based in London, UK. With a
            strong foundation in{' '}
            <strong>Next.js, React.js, JavaScript, and TypeScript.</strong> I
            thrive on building dynamic, user-friendly web applications that
            deliver seamless experiences.
          </Text>
          <Text>
            When I&apos;m not coding, you&apos;ll find me exploring the latest
            tech trends, tinkering with new libraries, or brainstorming ideas
            for my next project. I&apos;m excited to connect, collaborate, and
            create something amazing together!
          </Text>
        </div>
      </AnimatedMainMenusCard>
      <AnimatedMainMenusCard
        initial={{ y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.3 }}
        className='mt-8'
      >
        <Heading variant='h2'>What Do I do</Heading>
        <hr className='mt-1 mb-4' />
        <div className='relative grid  lg:grid-rows-2 grid-cols-1 gap-4 p-2 md:grid-cols-2 xl:grid-cols-3'>
          <MainMenusCard
            className='w-full h-full xl:col-span-2'
            Icon={<CodeXml />}
            description='Create modern, scalable websites using cutting-edge technologies, delivering seamless and functional digital experiences.'
            title='Web Development'
          />

          <MainMenusCard
            className=' '
            Icon={<Component />}
            description='Build dynamic, user-friendly interfaces that make your website not just functional but also fun and engaging to use.'
            title='Interactive UI'
          />
          <MainMenusCard
            Icon={<CircleGauge />}
            description='Speed matters. I optimize websites to load quickly and run smoothly, ensuring a seamless user experience.'
            title='Performance'
          />
          <MainMenusCard
            Icon={<Globe />}
            description='I ensure compatibility across different browsers, providing a consistent experience to all users.'
            title='Cross-Browser Compatibility'
            className='xl:col-span-2'
          />
        </div>
      </AnimatedMainMenusCard>
      <AnimatedMainMenusCard
        initial={{ y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.5,
        }}
        className='my-8 px-2'
      >
        <Heading variant='h2'>Technologies I Work With</Heading>
        <hr className='mt-1 mb-4' />
        <TickerCarousel items={technologies} speed={60} className='py-2' />
      </AnimatedMainMenusCard>
    </>
  );
};
export default HomePage;
