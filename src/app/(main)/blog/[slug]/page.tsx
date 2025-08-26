import BlogDetail from '@/components/Blogs/BlogDetail';
import { Heading, Text } from '@/components/theme/typography';

import { NextPage } from 'next';
type Props = {
  params: Promise<{ slug: string }>;
};

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;

  return (
    <div>
      <Heading variant='h2'>Title of the Blog</Heading>
      <hr className='mt-1 mb-4' />
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur
        maxime esse in quasi fuga delectus, vero placeat. Sint aperiam
        assumenda, saepe ut sequi, beatae voluptatem quos laborum fugiat illum
        velit autem? Possimus accusantium perspiciatis maxime itaque velit
        architecto non numquam? Quam quisquam totam possimus sed dolorum
        necessitatibus officiis modi ipsam!
      </Text>
      <BlogDetail />
    </div>
  );
};
export default BlogDetailPage;
