'use client';
import { AnimatePresence } from 'framer-motion';
import BlogItem from './BlogItem';
import { Blog } from '@/lib/queries';

type Props = {
  data: Blog[];
};
const Blogs: React.FC<Props> = ({ data }) => {
  const arrayOf5 = Array.from({ length: 5 }, (_, i) => i);
  console.log(data);
  return (
    <ul className='grid grid-cols gap-5 md:grid-cols-2 '>
      <AnimatePresence mode='sync'>
        {data.map((blog, index) => {
          return <BlogItem key={blog.sys.id} blog={blog} index={index} />;
        })}
      </AnimatePresence>
    </ul>
  );
};
export default Blogs;
