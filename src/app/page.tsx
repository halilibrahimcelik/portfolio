import { Heading, Text } from '@/components/theme/typography';
import ThemeToggle from '@/components/ThemeToggle';
import Container from '@/components/ui/Container';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'This is my personal website.',
};
const HomePage: NextPage = () => {
  return (
    <main>
      <Container>
        <Heading variant='h1'>Hello, World!</Heading>
        <Text>Welcome to my website.</Text>
        <div className='flex items-end justify-end '>
          <ThemeToggle />
        </div>
      </Container>
    </main>
  );
};
export default HomePage;
