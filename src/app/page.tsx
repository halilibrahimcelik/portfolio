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
        <h1>Hello, World!</h1>
        <p>Welcome to my website.</p>
        <div className='flex items-end justify-end '>
          <ThemeToggle />
        </div>
      </Container>
    </main>
  );
};
export default HomePage;
