import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Heading, Text } from '../theme/typography';
import ClickSpark from '../ClickSpark/ClickSpark';
import AnimatedCard from '../ui/AnimatedCard';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
  index: number;
};
const BlogItem: React.FC<Props> = ({ index }) => {
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
          Blog Title
        </Heading>
        <Image
          alt='Blog Cover'
          priority
          width={'100'}
          height={100}
          className='object-cover  relative   transition-all ease-in duration-150  w-full rounded-2xl'
          src={'/logo.jpg'}
        />
        <Text className='relative line-clamp-3 overflow-hidden text-ellipsis'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas qui,
          quisquam dolorem maxime sequi omnis dicta dignissimos facilis
          reprehenderit dolorum alias praesentium deleniti modi possimus, iusto
          id corporis eveniet magnam et quia tempore in sapiente natus eum?
          Ullam nemo ipsa impedit, sed qui quisquam fuga nihil error nisi
          mollitia? Amet.
        </Text>
        <Link href={`/blog/sample-blog-slug`} className='self-end'>
          <Button variant={'secondary'}>
            <ClickSpark>Read More</ClickSpark>
          </Button>{' '}
        </Link>
      </AnimatedCard>
    </motion.li>
  );
};
export default BlogItem;
