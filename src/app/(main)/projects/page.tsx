import Projects from '@/components/Projects/Projects';
import { Heading, Text } from '@/components/theme/typography';
import client from '@/lib/apolloClient';
import { FETCH_PROJETS_LIST, ProjectsCollection } from '@/lib/queries';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Projects',
  description: 'Welcome to my projects page.',
};
const ProjectsPage: NextPage = async () => {
  const { data } = await client.query<ProjectsCollection>({
    query: FETCH_PROJETS_LIST,
    fetchPolicy: 'network-only',
  });

  return (
    <main>
      <Heading variant='h2'>My Projects</Heading>
      <hr className='mt-1 mb-4' />
      <Text>Here you can find my recent work and ongoing projects.</Text>
      <Text>Stay tuned for updates!</Text>
      <Projects projects={data.projectsCollection.items} />
    </main>
  );
};
export default ProjectsPage;
