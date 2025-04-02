import Dock from '@/components/Dock/Dock';
import StickyHeader from '@/components/header/StickyHeader';
import Logo from '@/components/icons/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { Card } from '@/components/ui/card';
import Container from '@/components/ui/Container';
import { HomeIcon, ProjectorIcon, UserIcon } from 'lucide-react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const items = [
    {
      icon: <HomeIcon size={18} />,
      label: 'Home',
      href: '/',
    },
    {
      icon: <ProjectorIcon size={18} />,
      label: 'Projects',
      href: '/projects',
    },
    {
      icon: <UserIcon size={18} />,
      label: 'Contact Us',
      href: '/contact-me',
    },
  ];

  return (
    <Container>
      <div className='flex justify-between items-center py-4'>
        <Logo />
        <div className='flex items-end justify-end '>
          <ThemeToggle />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row gap-4  mt-20 pb-20 relative min-h-[140vh]'>
        <StickyHeader />
        <Card asChild className='flex-grow px-4 py-8 overflow-hidden'>
          <main>{children}</main>
        </Card>
        <Dock items={items} />
      </div>
    </Container>
  );
};
export default MainLayout;
