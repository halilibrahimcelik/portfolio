import { Project } from '@/lib/queries';
import AnimatedCard from '../ui/AnimatedCard';
import Link from 'next/link';
import Image from 'next/image';
import { Heading } from '../theme/typography';

type Props = {
  project: Project;
};

const ProjectItem: React.FC<Props> = ({ project }) => {
  return (
    <Link
      className='w-full h-full flex flex-col items-center justify-center'
      href={`/projects/${project.sys.id}`}
      passHref
    >
      <AnimatedCard className='w-full p-3 group' circleSize={400}>
        <Heading
          variant='h4'
          className='dark:group-hover:text-white relative text-center mb-2'
        >
          {project.title}
        </Heading>
        {/* <p>{project.description}</p> */}
        <div className='h-72 overflow-hidden  relative rounded-2xl'>
          <Image
            src={project.image.url}
            alt={project.title}
            fill
            className='object-cover group-hover:h-20   transition-all ease-in duration-150  w-full rounded-2xl'
          />
        </div>
      </AnimatedCard>
    </Link>
  );
};
export default ProjectItem;
