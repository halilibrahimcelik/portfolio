'use client';

import Image from 'next/image';
import React from 'react';

const Projects = () => {
  return (
    <ul>
      {data?.projectsCollection.items.map((project) => (
        <li key={project.title}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <Image
            src={project.image.url}
            objectFit='cover'
            alt={project.image.title}
            width={300}
            height={200}
          />
        </li>
      ))}
    </ul>
  );
};
export default Projects;
