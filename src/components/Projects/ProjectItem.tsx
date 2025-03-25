import { Project } from '@/lib/queries';
import AnimatedCard from '../ui/AnimatedCard';
import Link from 'next/link';

type Props = {
  project: Project;
};

const ProjectItem: React.FC<Props> = ({ project }) => {
  return (
    <Link href={`/projects/${project.sys.id}`} passHref>
      <AnimatedCard circleSize={100}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </AnimatedCard>
    </Link>
  );
};
export default ProjectItem;
