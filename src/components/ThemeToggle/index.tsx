'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

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
    <div>
      <Button
        className='rounded-full relative'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        variant='secondary'
        size='icon'
      >
        <SunIcon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500
      ${darkModeClass}`}
        />
        <MoonIcon
          className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-500
      ${lightModeClass}`}
        />
      </Button>
    </div>
  );
};
export default ThemeToggle;
