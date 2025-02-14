'use client';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Text } from '../theme/typography';
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
    <TooltipProvider disableHoverableContent delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
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
        </TooltipTrigger>
        <TooltipContent
          className='rounded-xl py-1 px-2'
          side='right'
          sideOffset={4}
        >
          <Text variant='badge'>
            {theme !== 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default ThemeToggle;
