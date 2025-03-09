'use client';
import { FETCH_PROJETS_LIST, ProjectsCollection } from '@/lib/queries';
import { useQuery } from '@apollo/client';
import Image from 'next/image';
import React from 'react';

const Projects = () => {
  const { data, loading, error } =
    useQuery<ProjectsCollection>(FETCH_PROJETS_LIST);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
