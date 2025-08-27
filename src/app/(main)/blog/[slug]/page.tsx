import BlogDetail from '@/components/Blogs/BlogDetail';
import { Heading } from '@/components/theme/typography';
import client from '@/lib/apolloClient';
import { Blog, FETCH_BLOG_LIST, FETCH_SINGLE_BLOG } from '@/lib/queries';
import { isSlugId, slugify } from '@/lib/utils';

import { Metadata, NextPage } from 'next';
import { notFound, redirect } from 'next/navigation';
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let blog: Blog | null = null;
  let blogId: string = slug;
  console.log(isSlugId(slug));
  // If this is a title-based slug, we need to find the corresponding ID
  if (!isSlugId(slug)) {
    // Try to fetch from cache first
    try {
      const { data: allBlogData } = await client.query({
        query: FETCH_BLOG_LIST,
        fetchPolicy: 'cache-only',
      });
      console.log(allBlogData);
      // Find the project with the matching slug
      const matchingProject = allBlogData.blogsCollection.items.find(
        (p: Blog) => slugify(p.blogTitle) === slug
      );

      if (matchingProject) {
        blogId = matchingProject.sys.id;
      }
    } catch {
      // If cache-only fails, make a network request
      const { data: allBlogData } = await client.query({
        query: FETCH_BLOG_LIST,
        fetchPolicy: 'network-only', // Fallback to network
      });
      console.log(allBlogData);
      // Find the project with the matching slug
      const matchingProject = allBlogData.blogsCollection.items.find(
        (p: Blog) => slugify(p.blogTitle) === slug
      );

      if (matchingProject) {
        blogId = matchingProject.sys.id;
      } else {
        return notFound();
      }
    }
  }

  // Now fetch the project using the correct ID
  const { data } = await client.query<{ blogs: Blog }>({
    query: FETCH_SINGLE_BLOG,
    variables: { id: blogId },
    fetchPolicy: 'cache-first',
  });

  blog = data.blogs;

  const canonicalSlug = slugify(blog.blogTitle);

  return {
    title: blog.blogTitle,
    description: blog.teaserIntro,
    openGraph: {
      title: blog.blogTitle,
      description: blog.teaserIntro,
      url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${canonicalSlug}`,
      images: blog.coverImage
        ? [
            {
              url: blog.coverImage.url,
              width: blog.coverImage.width,
              height: blog.coverImage.height,
              alt: blog.coverImage.title || 'Blog Cover Image',
            },
          ]
        : undefined,
      siteName: 'Halil Ibrahim Celik',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.blogTitle,
      description: blog.teaserIntro,
      images: blog.coverImage ? [blog.coverImage.url] : undefined,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/blog/${canonicalSlug}`,
    },
  };
}

const BlogDetailPage: NextPage<Props> = async ({ params }) => {
  const { slug } = await params;
  let blog: Blog | null = null;
  let blogId: string = slug;
  console.log(isSlugId(slug));
  // If this is a title-based slug, we need to find the corresponding ID
  if (!isSlugId(slug)) {
    // Try to fetch from cache first
    try {
      const { data: allBlogData } = await client.query({
        query: FETCH_BLOG_LIST,
        fetchPolicy: 'cache-only',
      });
      console.log(allBlogData);
      // Find the project with the matching slug
      const matchingProject = allBlogData.blogsCollection.items.find(
        (p: Blog) => slugify(p.blogTitle) === slug
      );

      if (matchingProject) {
        blogId = matchingProject.sys.id;
      }
    } catch {
      // If cache-only fails, make a network request
      const { data: allBlogData } = await client.query({
        query: FETCH_BLOG_LIST,
        fetchPolicy: 'network-only', // Fallback to network
      });
      console.log(allBlogData);
      // Find the project with the matching slug
      const matchingProject = allBlogData.blogsCollection.items.find(
        (p: Blog) => slugify(p.blogTitle) === slug
      );

      if (matchingProject) {
        blogId = matchingProject.sys.id;
      } else {
        return notFound();
      }
    }
  }

  // Now fetch the project using the correct ID
  const { data } = await client.query<{ blogs: Blog }>({
    query: FETCH_SINGLE_BLOG,
    variables: { id: blogId },
    fetchPolicy: 'cache-first',
  });

  blog = data.blogs;

  const canonicalSlug = slugify(blog.blogTitle);

  // If we're on an ID URL, redirect to the canonical slug URL
  if (isSlugId(slug) && slug !== canonicalSlug) {
    redirect(`/blog/${canonicalSlug}`);
  }
  return (
    <div>
      <Heading variant='h2'>{blog.blogTitle}</Heading>
      <hr className='mt-1 mb-4' />

      <BlogDetail blog={blog} />
    </div>
  );
};
export default BlogDetailPage;
