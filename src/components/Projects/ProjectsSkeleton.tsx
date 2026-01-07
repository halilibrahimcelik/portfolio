import { Skeleton } from "../ui/skeleton";

const ProjectsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => {
        return (
          <Skeleton
            className="w-full lg:w-[400px] h-[350px]"
            key={index}
          ></Skeleton>
        );
      })}
    </>
  );
};
export default ProjectsSkeleton;
