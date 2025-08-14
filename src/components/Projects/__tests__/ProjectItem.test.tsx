import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import ProjectItem from '../ProjectItem';
import { Project } from '@/lib/queries';

const mockProject: Project = {
  title: 'Test Project',
  sys: {
    id: 'test-project-id',
  },
  description: 'This is a test project description',
  websiteUrl: 'https://example.com',
  image: {
    url: 'https://example.com/image.jpg',
    title: 'Test Project Image',
  },
};

describe('ProjectItem Component', () => {
  it('renders project title', () => {
    render(<ProjectItem project={mockProject} index={0} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project image with correct attributes', () => {
    render(<ProjectItem project={mockProject} index={0} />);
    
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('creates correct link to project detail page', () => {
    render(<ProjectItem project={mockProject} index={0} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/projects/test-project-id');
  });

  it('applies correct CSS classes for styling', () => {
    render(<ProjectItem project={mockProject} index={0} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveClass('w-full', 'h-full', 'flex', 'flex-col');
  });

  it('renders with different index values', () => {
    const { rerender } = render(<ProjectItem project={mockProject} index={0} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    rerender(<ProjectItem project={mockProject} index={5} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('handles long project titles', () => {
    const longTitleProject = {
      ...mockProject,
      title: 'This is a very long project title that should still render correctly',
    };
    
    render(<ProjectItem project={longTitleProject} index={0} />);
    
    expect(screen.getByText('This is a very long project title that should still render correctly')).toBeInTheDocument();
  });

  it('handles projects with different image URLs', () => {
    const differentImageProject = {
      ...mockProject,
      image: {
        url: 'https://different-domain.com/different-image.png',
        title: 'Different Image',
      },
    };
    
    render(<ProjectItem project={differentImageProject} index={0} />);
    
    const image = screen.getByAltText('Test Project');
    expect(image).toHaveAttribute('src', 'https://different-domain.com/different-image.png');
  });
});