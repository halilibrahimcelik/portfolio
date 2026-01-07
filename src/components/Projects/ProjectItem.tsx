import { Project } from "@/lib/queries";
import AnimatedCard from "../ui/AnimatedCard";
import Link from "next/link";
import Image from "next/image";
import { Heading } from "../theme/typography";
import { motion } from "framer-motion";

type Props = {
  project: Project;
  index: number;
};

const ProjectItem: React.FC<Props> = ({ project, index }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-fit"
      transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 * index }}
    >
      <Link
        className="w-full h-full flex flex-col items-center justify-center"
        href={`/projects/${project.sys.id}`}
      >
        <AnimatedCard className="w-full p-3 group" circleSize={400}>
          <Heading
            variant="h4"
            className="dark:group-hover:text-white relative text-center mb-2"
          >
            {project.title}
          </Heading>
          {/* <p>{project.description}</p> */}
          <div className="h-72 overflow-hidden  relative rounded-2xl">
            <Image
              src={project.image.url}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:h-20   transition-all ease-in duration-150  w-full rounded-2xl"
            />
          </div>
        </AnimatedCard>
      </Link>
    </motion.li>
  );
};
export default ProjectItem;
