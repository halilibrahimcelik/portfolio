import { Metadata, NextPage } from 'next';
export const metadata: Metadata = {
  title: 'Halil | Blogs',
  description: 'Welcome to my blog page.',
};
const BlogPage: NextPage = () => {
  return (
    <div>
      <h1>Blog</h1>
    </div>
  );
};

export default BlogPage;
