import BlogDetail from '@/components/Blogs/BlogDetail';
import { Heading } from '@/components/theme/typography';
import client from '@/lib/apolloClient';
import { Blog, FETCH_SINGLE_BLOG } from '@/lib/queries';

import { NextPage } from 'next';
type Props = {
  params: Promise<{ slug: string }>;
};

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;
  const {
    data: { blogs },
  } = await client.query<{ blogs: Blog }>({
    query: FETCH_SINGLE_BLOG,
    variables: { id: slug },
    fetchPolicy: 'no-cache',
  });

  return (
    <div>
      <Heading variant='h2'>{blogs.blogTitle}</Heading>
      <hr className='mt-1 mb-4' />

      <BlogDetail blog={blogs} />
    </div>
  );
};
export default BlogDetailPage;
