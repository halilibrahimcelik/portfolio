'use client';
import { AnimatePresence } from 'framer-motion';
import BlogItem from './BlogItem';

const Blogs: React.FC = () => {
  const arrayOf5 = Array.from({ length: 5 }, (_, i) => i);
  return (
    <ul className='grid grid-cols gap-5 md:grid-cols-2 '>
      <AnimatePresence mode='sync'>
        {arrayOf5.map((i) => {
          return <BlogItem key={i} index={i} />;
        })}
      </AnimatePresence>
    </ul>
  );
};
export default Blogs;
