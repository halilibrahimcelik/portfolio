import { Project } from '@/lib/queries';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Block, Inline } from '@contentful/rich-text-types';

import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import CopyButton from '../ui/CopyButton';

type Props = {
  project: Project;
};
const ProjectDetail: React.FC<Props> = async ({ project }) => {
  const content = await richTextFromMarkdown(project.description);
  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
        <p className='mb-4'>{children}</p>
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
      [INLINES.HYPERLINK]: (
        node: Block | Inline,
        children: React.ReactNode
      ) => (
        <a
          href={node.data.uri}
          className='text-blue-600 hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          {children}
        </a>
      ),
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

        return (
          <CopyButton
            buttonClass='bg-gray-800 flex cursor-pointer w-full text-gray-100 p-4 relative group rounded-md overflow-x-auto mb-4'
            textClass='text-sm'
            text={` ${text}`}
          />
        );
      },
    },
  };

  return <div>{documentToReactComponents(content, options)}</div>;
};
export default ProjectDetail;
