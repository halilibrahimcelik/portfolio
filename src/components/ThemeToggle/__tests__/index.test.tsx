import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { useTheme } from 'next-themes';
import ThemeToggle from '../index';

// Mock useTheme hook
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
  ThemeProvider: ({ children }: any) => children,
}));

describe('ThemeToggle Component', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as any).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
      resolvedTheme: 'dark',
    });
  });

  it('renders theme toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('shows correct icon for dark theme', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    // Moon icon should be visible for dark theme
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('shows tooltip on hover', async () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.mouseEnter(button);
    
    await waitFor(() => {
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });
  });

  it('switches to light theme correctly', () => {
    (useTheme as any).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
      resolvedTheme: 'light',
    });

    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});