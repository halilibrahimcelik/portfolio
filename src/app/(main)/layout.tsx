import StickyHeader from '@/components/header/StickyHeader';
import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import Container from '@/components/ui/Container';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className='flex justify-between items-center py-4'>
        <Logo />
        <div className='flex items-end justify-end '>
          <ThemeToggle />
        </div>
      </div>
      <div className='flex gap-4  mt-20 relative min-h-[calc(100vh-200px)]'>
        <StickyHeader />
        <Card asChild className='flex-grow '>
          <main>{children}</main>
        </Card>
      </div>
    </Container>
  );
};
export default MainLayout;
