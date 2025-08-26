import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Heading, Text } from '../theme/typography';
import ClickSpark from '../ClickSpark/ClickSpark';
import AnimatedCard from '../ui/AnimatedCard';
import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/lib/queries';
type Props = {
  index: number;
  blog: Blog;
};
const BlogItem: React.FC<Props> = ({ index, blog }) => {
  console.log(blog.coverImage?.url);

  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 * index }}
    >
      <AnimatedCard circleSize={100} className='flex flex-col gap-2'>
        <Heading
          variant='h4'
          className='dark:group-hover:text-white relative text-center mb-2'
        >
          {blog.blogTitle}
        </Heading>
        <Image
          alt='Blog Cover'
          width={`${blog.coverImage?.width}` || '500'}
          quality={100}
          height={blog.coverImage?.height || 300}
          className='object-cover  relative   transition-all ease-in duration-150  w-full rounded-2xl'
          src={blog.coverImage?.url || '/placeholder.png'}
        />
        <Text className='relative line-clamp-3 overflow-hidden text-ellipsis'>
          {blog.teaserIntro}
        </Text>

        <Link
          className='self-end relative z-10 cursor-pointer'
          href={`/blog/${blog.sys.id}`}
        >
          <Button variant={'secondary'}>
            <ClickSpark>Read More </ClickSpark>
          </Button>
        </Link>
      </AnimatedCard>
    </motion.li>
  );
};
export default BlogItem;
