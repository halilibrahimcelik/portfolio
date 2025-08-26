import Blogs from '@/components/Blogs/Blogs';
import { Heading, Text } from '@/components/theme/typography';
import client from '@/lib/apolloClient';
import { BlogsCollection, FETCH_BLOG_LIST } from '@/lib/queries';
import { useQuery } from '@apollo/client';
import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Halil | Blogs',
  description: 'Welcome to my blog page.',
};
const BlogPage: NextPage = async () => {
  const { data } = await client.query<BlogsCollection>({
    query: FETCH_BLOG_LIST,
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <Heading variant='h2'>Blog</Heading>
      <hr className='mt-1 mb-4' />
      <Text variant='default'>
        Where my thoughts go to die and typos come alive!
      </Text>

      <div className='mt-8'>
        <Blogs data={data.blogsCollection.items} />
      </div>
    </div>
  );
};

export default BlogPage;
