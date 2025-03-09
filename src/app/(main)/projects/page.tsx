import { Heading, Text } from '@/components/theme/typography';
import client from '@/lib/apolloClient';
import { FETCH_PROJETS_LIST, ProjectsCollection } from '@/lib/queries';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Halil | Frontend Developer',
  description: 'Welcome to my projects page.',
};
const ProjectsPage: NextPage = async () => {
  const { data } = await client.query<ProjectsCollection>({
    query: FETCH_PROJETS_LIST,
    fetchPolicy: 'cache-first',
  });

  return (
    <main>
      <Heading variant='h1'>Hello, World!</Heading>
      <Text>This is my projects page.</Text>
      <Text>Here you can find my recent work and ongoing projects.</Text>
      <Text>Stay tuned for updates!</Text>
      <ul>
        {data?.projectsCollection.items.map((project) => (
          <li key={project.title}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <Image
              src={project.image.url}
              alt={project.image.title}
              width={300}
              height={200}
            />
          </li>
        ))}
      </ul>
    </main>
  );
};
export default ProjectsPage;
