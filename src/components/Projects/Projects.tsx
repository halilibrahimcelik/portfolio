'use client';
import React from 'react';
import ProjectItem from './ProjectItem';
import { Project } from '@/lib/queries';

type Props = {
  projects: Project[];
};

const Projects: React.FC<Props> = ({ projects }) => {
  return (
    <ul className='grid  grid-cols-1  gap-4 lg:grid-cols-2'>
      {projects.map((projects) => {
        return <ProjectItem key={projects.sys.id} project={projects} />;
      })}
    </ul>
  );
};
export default Projects;
