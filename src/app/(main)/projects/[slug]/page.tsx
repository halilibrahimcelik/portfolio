import ProjectDetail from '@/components/ProjectDetail/ProjectDetail';
import { Heading } from '@/components/theme/typography';
import GoBackButton from '@/components/ui/GoBackButton';
import client from '@/lib/apolloClient';
import {
  FETCH_PROJETS_LIST,
  FETCH_SINGLE_PROJECT,
  Project,
} from '@/lib/queries';
import { isSlugId, slugify } from '@/lib/utils';
import { Link } from 'lucide-react';
import { Metadata, NextPage } from 'next';
import Image from 'next/image';
import { redirect, notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

// This function checks if the provided slug is an ID

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let project: Project | null = null;
  let projectId: string = slug;

  // If this is a title-based slug, we need to find the corresponding ID
  if (!isSlugId(slug)) {
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
  if (!isSlugId(slug)) {
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
  if (isSlugId(slug) && slug !== canonicalSlug) {
    redirect(`/projects/${canonicalSlug}`);
  }
  return (
    <div>
      <div className='flex w-full flex-col gap-3 md:gap-1 md:flex-row  justify-content-center md:justify-between  items-center'>
        <div className='flex   items-center  md:items-start flex-col gap-1 '>
          <Heading className='flex-1 ' variant='h2'>
            {project.title}
          </Heading>

          <a
            className='text-sm wtext-muted-foreground cursor-pointer transition-all ease-in duration-150 opacity-100 hover:opacity-80 hover:scale-[1.02]  flex items-center gap-1 '
            href={project.websiteUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Link size={20} />
            <span className='max-w-[380px] md:max-w-[400px]    text-ellipsis whitespace-nowrap    overflow-hidden '>
              {' '}
              {project.websiteUrl}
            </span>
          </a>
        </div>

        <GoBackButton className='w-full md:w-fit block' url='/projects' />
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
