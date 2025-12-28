import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/types";
import { useMemo } from "react";

interface ProjectPaginationProps {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProjectPagination = ({
  total,
  currentPage,
  setCurrentPage,
}: ProjectPaginationProps) => {
  const totalPages = useMemo(
    () => Math.ceil(total / PAGE_SIZE.PROJECTS),
    [total]
  );
  const handleDecrement = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    if (currentPage === 1) {
      setCurrentPage(1);
    }
  };
  const handleIncrement = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
    if (currentPage === totalPages) {
      setCurrentPage(totalPages);
    }
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handleDecrement}>
          <PaginationPrevious />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem onClick={handleIncrement}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProjectPagination;
