'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { Text } from '../theme/typography';
import { Card } from '../ui/card';

const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [darkModeClass, setDarkModeClass] = useState('');
  const [lightModeClass, setLightModeClass] = useState('');
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
    }
  }, []);
  useEffect(() => {
    if (theme === 'dark') {
      setDarkModeClass('opacity-100  scale-100');
      setLightModeClass('opacity-0 scale-0');
    } else {
      setDarkModeClass('opacity-0 scale-0');
      setLightModeClass('opacity-100 scale-100');
    }
  }, [theme]);
  if (!isMounted) return null;

  return (
    <div className='group relative'>
      <Button
        className='WS relative'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant='secondary'
        size='icon'
      >
        <MoonIcon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500
          ${darkModeClass}`}
        />
        <SunIcon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500
          ${lightModeClass}`}
        />
      </Button>

      <Card className='px-[6px]  py-[2px] absolute bottom-3 transition-all  ease-in duration-200 opacity-0 group-hover:opacity-100 right-10 group-hover:scale-100 scale-50'>
        <Text variant='badge' className='  text-nowrap  '>
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </Text>
      </Card>
    </div>
  );
};
export default ThemeToggle;
