import MainMenusCard from '@/components/MainMenusCard/MainMenusCard';
import { Heading, Text } from '@/components/theme/typography';
import TickerCarousel from '@/components/Ticker/Ticker';
import TickerItem from '@/components/Ticker/TickerItem';
import client from '@/lib/apolloClient';
import { FETCH_TECH_STACKS, StacksCollection } from '@/lib/queries';
import { CircleGauge, CodeXml, Component, Globe } from 'lucide-react';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'This is my personal website.',
};
const HomePage: NextPage = async () => {
  const { data } = await client.query<StacksCollection>({
    query: FETCH_TECH_STACKS,
    fetchPolicy: 'no-cache',
  });
  const technologies = data?.stacksCollection.items.map((stack) => (
    <a href={stack.stackUrl} target='_blank' key={stack.label}>
      <TickerItem title={stack.label} imgUrl={stack.image.url} />{' '}
    </a>
  ));

  return (
    <main>
      <Heading variant='h2'>A Bit About Me</Heading>
      <hr className='mt-1 mb-4' />
      <div className='flex flex-col gap-2'>
        <Text>
          Hi there! I&apos;m Halil Ibrahim Celik, a passionate and
          detail-oriented Frontend Developer based in London, UK. With a strong
          foundation in{' '}
          <strong>Next.js, React.js, JavaScript, and TypeScript.</strong> I
          thrive on building dynamic, user-friendly web applications that
          deliver seamless experiences.
        </Text>
        <Text>
          When I&apos;m not coding, you&apos;ll find me exploring the latest
          tech trends, tinkering with new libraries, or brainstorming ideas for
          my next project. I&apos;m excited to connect, collaborate, and create
          something amazing together!
        </Text>
      </div>
      <div className='mt-8'>
        <Heading variant='h2'>What Do I do</Heading>
        <hr className='mt-1 mb-4' />
        <div className='relative grid  lg:grid-rows-2 grid-cols-1 gap-4 p-2 md:grid-cols-2 xl:grid-cols-3'>
          <MainMenusCard
            Icon={<CodeXml />}
            className='p-4 xl:col-span-2'
            description='Create modern, scalable websites using cutting-edge technologies, delivering seamless and functional digital experiences.'
            title='Web Development'
          ></MainMenusCard>
          <MainMenusCard
            className='p-4 '
            Icon={<Component />}
            description='Build dynamic, user-friendly interfaces that make your website not just functional but also fun and engaging to use.'
            title='Interactive UI'
          ></MainMenusCard>
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
      </div>
      <div className='my-8 py-6 bg-gradient-to-r  rounded-lg'>
        <Heading variant='h3' className='text-center mb-4'>
          Technologies I Work With
        </Heading>
        <TickerCarousel items={technologies} speed={60} className='py-2' />
      </div>
    </main>
  );
};
export default HomePage;
