'use client';
import { MoonIcon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';

const ThemeToggle: React.FC = () => {
  const { setTheme } = useTheme();
  return (
    <div>
      <Button onClick={() => setTheme('dark')} variant={'ghost'} size={'icon'}>
        <MoonIcon />
      </Button>
      <Button onClick={() => setTheme('light')} variant={'ghost'} size={'icon'}>
        <Sun />{' '}
      </Button>
    </div>
  );
};
export default ThemeToggle;
