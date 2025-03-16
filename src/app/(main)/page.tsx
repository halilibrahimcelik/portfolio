import { MainMenusGradientCard } from '@/components/AnimatedCard/AnimatedCard';
import { Heading, Text } from '@/components/theme/typography';
import { CircleGauge, CodeXml, Component, Globe } from 'lucide-react';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'This is my personal website.',
};
const HomePage: NextPage = () => {
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
          <MainMenusGradientCard
            Icon={<CodeXml />}
            className='p-4 xl:col-span-2'
            description='Create modern, scalable websites using cutting-edge technologies, delivering seamless and functional digital experiences.'
            title='Web Development'
          ></MainMenusGradientCard>
          <MainMenusGradientCard
            className='p-4 '
            Icon={<Component />}
            description='Build dynamic, user-friendly interfaces that make your website not just functional but also fun and engaging to use.'
            title='Interactive UI'
          ></MainMenusGradientCard>
          <MainMenusGradientCard
            Icon={<CircleGauge />}
            description='Speed matters. I optimize websites to load quickly and run smoothly, ensuring a seamless user experience.'
            title='Performance'
          />
          <MainMenusGradientCard
            Icon={<Globe />}
            description='I ensure compatibility across different browsers, providing a consistent experience to all users.'
            title='Cross-Browser Compatibility'
            className='xl:col-span-2'
          />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
