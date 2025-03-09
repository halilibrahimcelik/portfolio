import Projects from '@/components/Projects/Projects';
import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'Welcome to my projects page.',
};
const ProjectsPage: NextPage = () => {
  return (
    <main>
      <Heading variant='h1'>Hello, World!</Heading>
      <Text>This is my projects page.</Text>
      <Text>Here you can find my recent work and ongoing projects.</Text>
      <Text>Stay tuned for updates!</Text>
      <Projects />
    </main>
  );
};
export default ProjectsPage;
