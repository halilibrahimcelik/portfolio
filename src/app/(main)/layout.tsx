import StickyHeader from '@/components/header/StickyHeader';
import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import Container from '@/components/ui/Container';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative min-h-screen'>
      <Container>
        <StickyHeader />
        <div className='flex justify-between items-center py-4'>
          <Logo />
          <div className='flex items-end justify-end '>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </Container>
    </div>
  );
};
export default MainLayout;
