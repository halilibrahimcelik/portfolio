'use client';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Block, Inline } from '@contentful/rich-text-types';

import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Blog } from '@/lib/queries';
import CopyButton from '../ui/CopyButton';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  blog: Blog;
};
const BlogDetail: React.FC<Props> = ({ blog }) => {
  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
        <div className='mb-4'>{children}</div>
      ),
      [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
        <h2 className='text-3xl font-bold mt-6 mb-4'>{children}</h2>
      ),
      [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
        <h2 className='text-2xl font-bold mt-6 mb-4'>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
        <h3 className='text-xl font-bold mt-5 mb-3'>{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
        <ul className='list-disc pl-6 mb-4'>{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
        <ol className='list-decimal pl-6 mb-4'>{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
        <li className='mb-1'>{children}</li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const assetId = node.data.target.sys.id;
        const asset = blog.description.links.assets.block.find(
          (asset) => asset.sys.id === assetId
        );

        if (!asset) {
          return null;
        }

        return (
          <div className='flex justify-center items-center my-4'>
            <Zoom classDialog='custom-zoom' zoomMargin={40}>
              <img
                alt={asset.title || 'Blog image'}
                src={asset.url}
                width={asset.width || 500}
                height={asset.height || 300}
                className='object-cover relative w-[200px] h-[200px] transition-all ease-in duration-150 rounded-2xl'
              />
            </Zoom>
          </div>
        );
      },
      [INLINES.HYPERLINK]: (
        node: Block | Inline,
        children: React.ReactNode
      ) => {
        return (
          <a
            href={node.data.uri}
            className='text-blue-600 hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            {children}
          </a>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (
        node: Block | Inline,
        children: React.ReactNode
      ) => {
        // Handle embedded entries here if needed
        return <span>{children}</span>;
      },
      [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => {
        // Sometimes code blocks are converted to blockquotes during markdown conversion
        return (
          <blockquote className='border-l-4 border-gray-300 pl-4 italic my-4'>
            {children}
          </blockquote>
        );
      },
    },
    renderMark: {
      [MARKS.CODE]: (text) => {
        // This handles inline code (`code`)
        if (typeof text === 'string' && text.includes('\n')) {
          const language = 'javascript';
          return (
            <div className='my-4  group relative z-1'>
              <SyntaxHighlighter
                style={agate}
                language={language}
                customStyle={{ borderRadius: '12px' }}
                PreTag='div'
              >
                {text}
              </SyntaxHighlighter>
              <div className='absolute z-[100] top-2 right-2'>
                <CopyButton text={text} notVisible />
              </div>
            </div>
          );
        }
        return (
          <code className='bg-gray-200 dark:bg-gray-700 text-foreground dark:text-primary font-mono p-1 rounded-md'>
            {text}
          </code>
        );
      },
    },
  };

  return (
    // <div className='flex justify-center items-center my-4'>
    //   <Zoom classDialog='custom-zoom' zoomMargin={40}>
    //     <img
    //       alt='Blog Cover'
    //       width={'150'}
    //       height={'150'}
    //       className='object-cover   relative   transition-all ease-in duration-150   rounded-2xl'
    //       src={'/ss.png'}
    //     />
    //   </Zoom>
    // </div>
    <div className='blog-content'>
      {documentToReactComponents(blog.description.json, options)}
    </div>
  );
};

export default BlogDetail;
