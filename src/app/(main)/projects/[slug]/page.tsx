import ProjectDetail from '@/components/ProjectDetail/ProjectDetail';
import { Heading } from '@/components/theme/typography';
import GoBackButton from '@/components/ui/GoBackButton';
import client from '@/lib/apolloClient';
import {
  FETCH_PROJETS_LIST,
  FETCH_SINGLE_PROJECT,
  Project,
} from '@/lib/queries';
import { slugify } from '@/lib/utils';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { redirect, notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// This function checks if the provided slug is an ID
function isProjectId(slug: string): boolean {
  return /^[a-zA-Z0-9]{16,}$/.test(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | null = null;
  let projectId: string = slug;

  // If this is a title-based slug, we need to find the corresponding ID
  if (!isProjectId(slug)) {
    // Try to fetch from cache first
    try {
      const { data: allProjectsData } = await client.query({
        query: FETCH_PROJETS_LIST,
        fetchPolicy: 'cache-only',
      });

      // Find the project with the matching slug
      const matchingProject = allProjectsData.projectsCollection.items.find(
        (p: Project) => slugify(p.title) === slug
      );

      if (matchingProject) {
        projectId = matchingProject.sys.id;
      }
    } catch {
      // If cache-only fails, make a network request
      const { data: allProjectsData } = await client.query({
        query: FETCH_PROJETS_LIST,
        fetchPolicy: 'network-only', // Fallback to network
      });

      // Find the project with the matching slug
      const matchingProject = allProjectsData.projectsCollection.items.find(
        (p: Project) => slugify(p.title) === slug
      );

      if (matchingProject) {
        projectId = matchingProject.sys.id;
      } else {
        return notFound();
      }
    }
  }

  // Now fetch the project using the correct ID
  const { data } = await client.query<{ projects: Project }>({
    query: FETCH_SINGLE_PROJECT,
    variables: { id: projectId },
    fetchPolicy: 'cache-first',
  });

  project = data.projects;

  return {
    title: project
      ? project.title + ' ' + '| Halil Ibrahim Celik'
      : 'Project not found',
    description: project ? project.title : 'Project not found',
    openGraph: {
      title: project ? project.title : 'Project not found',
      description: project ? project.title : 'Project not found',
      images: [
        {
          url: project?.image.url || '',
          alt: project ? project.title : 'Project not found',
        },
      ],
    },
  };
}
const ProjectDetailsPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;

  let project: Project | null = null;
  let projectId: string = slug;

  // If this is a title-based slug, we need to find the corresponding ID
  if (!isProjectId(slug)) {
    // Try to fetch from cache first
    try {
      const { data: allProjectsData } = await client.query({
        query: FETCH_PROJETS_LIST,
        fetchPolicy: 'cache-only',
      });

      // Find the project with the matching slug
      const matchingProject = allProjectsData.projectsCollection.items.find(
        (p: Project) => slugify(p.title) === slug
      );

      if (matchingProject) {
        projectId = matchingProject.sys.id;
      }
    } catch {
      // If cache-only fails, make a network request
      const { data: allProjectsData } = await client.query({
        query: FETCH_PROJETS_LIST,
        fetchPolicy: 'network-only', // Fallback to network
      });

      // Find the project with the matching slug
      const matchingProject = allProjectsData.projectsCollection.items.find(
        (p: Project) => slugify(p.title) === slug
      );

      if (matchingProject) {
        projectId = matchingProject.sys.id;
      } else {
        return notFound();
      }
    }
  }

  // Now fetch the project using the correct ID
  const { data } = await client.query<{ projects: Project }>({
    query: FETCH_SINGLE_PROJECT,
    variables: { id: projectId },
    fetchPolicy: 'cache-first',
  });

  project = data.projects;

  if (!project) {
    return notFound();
  }

  // Generate the canonical slug for this project
  const canonicalSlug = slugify(project.title);

  // If we're on an ID URL, redirect to the canonical slug URL
  if (isProjectId(slug) && slug !== canonicalSlug) {
    redirect(`/projects/${canonicalSlug}`);
  }

  return (
    <div>
      <div className='flex w-full justify-between items-center'>
        <Heading className='flex-1 ' variant='h2'>
          {project.title}
        </Heading>

        <GoBackButton url='/projects' />
      </div>
      <hr className='mt-1 mb-4' />
      <Image
        className='rounded-lg mb-4 '
        priority
        src={project.image.url}
        alt={project.title}
        width={1000}
        height={400}
      />
      <ProjectDetail project={project} />
    </div>
  );
};

export default ProjectDetailsPage;
