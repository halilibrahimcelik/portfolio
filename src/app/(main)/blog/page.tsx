import Blogs from '@/components/Blogs/Blogs';
import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Halil | Blogs',
  description: 'Welcome to my blog page.',
};
const BlogPage: NextPage = () => {
  return (
    <div>
      <Heading variant='h2'>Blog</Heading>
      <hr className='mt-1 mb-4' />
      <Text variant='default'>
        Where my thoughts go to die and typos come alive!
      </Text>

      <div className='mt-8'>
        <Blogs />
      </div>
    </div>
  );
};

export default BlogPage;
