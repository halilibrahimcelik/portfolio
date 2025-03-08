import { Heading, Text } from '@/components/theme/typography';
import { fetchProjects } from '@/lib/api';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'Welcome to my projects page.',
};
const ProjectsPage: NextPage = async () => {
  const projects = await fetchProjects();
  console.log(projects);
  return (
    <main>
      <Heading variant='h1'>Hello, World!</Heading>
      <Text>This is my projects page.</Text>
      <Text>Here you can find my recent work and ongoing projects.</Text>
      <Text>Stay tuned for updates!</Text>
      <ul>
        {projects.map((project) => (
          <li key={project.title}>
            <Heading variant='h3'>{project.title}</Heading>
            <Text>{project.description}</Text>
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ProjectsPage;
