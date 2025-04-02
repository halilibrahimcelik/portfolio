'use client';
import React from 'react';
import ProjectItem from './ProjectItem';
import { Project } from '@/lib/queries';
import { AnimatePresence } from 'framer-motion';

type Props = {
  projects: Project[];
};

const Projects: React.FC<Props> = ({ projects }) => {
  return (
    <ul className='grid  grid-cols-1 my-5  gap-4 lg:grid-cols-2'>
      <AnimatePresence mode='wait'>
        {projects.map((project, index) => {
          return (
            <ProjectItem key={project.sys.id} project={project} index={index} />
          );
        })}
      </AnimatePresence>
    </ul>
  );
};
export default Projects;
