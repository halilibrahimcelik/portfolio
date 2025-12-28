"use client";
import React, { useState, useEffect } from "react";
import ProjectItem from "./ProjectItem";
import { FETCH_PROJECT_LISTS, Project } from "@/lib/queries";
import ProjectPagination from "./ProjectPagination";
import { useQuery } from "@apollo/client";
import ProjectsSkeleton from "./ProjectsSkeleton";
import { PAGE_SIZE } from "@/types";

type Props = {
  projects: Project[];
  total: number;
};

const Projects: React.FC<Props> = ({ projects, total }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);
  const { loading, data } = useQuery(FETCH_PROJECT_LISTS, {
    variables: {
      limit: PAGE_SIZE.PROJECTS,
      skip: (currentPage - 1) * PAGE_SIZE.PROJECTS,
    },
  });
  useEffect(() => {
    if (data) {
      setProjectsData(data.projectsCollection.items);
    }
  }, [data]);

  return (
    <>
      <ul className="grid  grid-cols-1 my-5  gap-4 lg:grid-cols-2">
        {loading ? (
          <ProjectsSkeleton />
        ) : (
          <>
            {projectsData.map((project, index) => (
              <ProjectItem
                key={project.sys.id}
                project={project}
                index={index}
              />
            ))}
          </>
        )}
      </ul>
      <ProjectPagination
        total={total}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
export default Projects;
