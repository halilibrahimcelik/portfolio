import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import { Heading, Text } from '../typography';

describe('Typography Components', () => {
  describe('Heading Component', () => {
    it('renders h1 variant correctly', () => {
      render(<Heading variant="h1">Test Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
      expect(heading.tagName).toBe('H1');
    });

    it('renders h2 variant correctly', () => {
      render(<Heading variant="h2">Test H2</Heading>);
      const heading = screen.getByRole('heading', { level: 2 });
      
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('applies custom className', () => {
      render(<Heading variant="h1" className="custom-class">Test</Heading>);
      const heading = screen.getByRole('heading');
      
      expect(heading).toHaveClass('custom-class');
    });

    it('applies default styling classes', () => {
      render(<Heading variant="h1">Test</Heading>);
      const heading = screen.getByRole('heading');
      
      expect(heading).toHaveClass('text-neutral-800', 'dark:text-neutral-300');
    });

    it('renders all heading variants', () => {
      const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      
      variants.forEach((variant, index) => {
        render(<Heading variant={variant}>Heading {variant}</Heading>);
        const heading = screen.getByRole('heading', { level: index + 1 });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe('Text Component', () => {
    it('renders default text variant', () => {
      render(<Text>Test text content</Text>);
      const text = screen.getByText('Test text content');
      
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('P');
    });

    it('renders small variant correctly', () => {
      render(<Text variant="small">Small text</Text>);
      const text = screen.getByText('Small text');
      
      expect(text).toHaveClass('text-xs');
    });

    it('renders xs variant correctly', () => {
      render(<Text variant="xs">Extra small text</Text>);
      const text = screen.getByText('Extra small text');
      
      expect(text).toHaveClass('text-[0.7rem]');
    });

    it('renders badge variant correctly', () => {
      render(<Text variant="badge">Badge text</Text>);
      const text = screen.getByText('Badge text');
      
      expect(text).toHaveClass('text-[9px]');
    });

    it('renders with icon', () => {
      const TestIcon = () => <span data-testid="test-icon">🎉</span>;
      render(<Text icon={<TestIcon />}>Text with icon</Text>);
      
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Text with icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<Text className="custom-text-class">Test</Text>);
      const text = screen.getByText('Test');
      
      expect(text).toHaveClass('custom-text-class');
    });

    it('applies default styling classes', () => {
      render(<Text>Test</Text>);
      const text = screen.getByText('Test');
      
      expect(text).toHaveClass('text-neutral-800', 'dark:text-neutral-300');
    });
  });
});