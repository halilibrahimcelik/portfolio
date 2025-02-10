import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'This is my personal website.',
};
const HomePage: NextPage = () => {
  return (
    <main>
      <Heading variant='h1'>Hello, World!</Heading>
      <Text>Welcome to my website.</Text>
    </main>
  );
};
export default HomePage;
