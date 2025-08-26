import { NextPage } from 'next';
type Props = {
  params: Promise<{ slug: string }>;
};

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;

  return <div>Hello Blog Detail Page for {slug}</div>;
};
export default BlogDetailPage;
