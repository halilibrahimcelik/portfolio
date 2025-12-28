"use client";
import React, { useState } from "react";
import ProjectItem from "./ProjectItem";
import { Project } from "@/lib/queries";
import { AnimatePresence } from "framer-motion";
import ProjectPagination from "./ProjectPagination";

type Props = {
  projects: Project[];
  total: number;
  pageSize: number;
};

const Projects: React.FC<Props> = ({ projects, total, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsData, setProjectsData] = useState<Project[]>(projects);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Fetch new projects data based on the page number if needed
  };

  return (
    <ul className="grid  grid-cols-1 my-5  gap-4 lg:grid-cols-2">
      <AnimatePresence mode="sync">
        {projectsData.map((project, index) => {
          return (
            <ProjectItem key={project.sys.id} project={project} index={index} />
          );
        })}
      </AnimatePresence>
      <ProjectPagination total={total} />
    </ul>
  );
};
export default Projects;
