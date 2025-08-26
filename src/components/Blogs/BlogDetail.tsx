'use client';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { Block, Inline } from '@contentful/rich-text-types';

import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const BlogDetail: React.FC = () => {
  return (
    <div className='flex justify-center items-center my-4'>
      <Zoom classDialog='custom-zoom' zoomMargin={40}>
        <img
          alt='Blog Cover'
          width={'150'}
          height={'150'}
          className='object-cover   relative   transition-all ease-in duration-150   rounded-2xl'
          src={'/ss.png'}
        />
      </Zoom>
    </div>
  );
};

export default BlogDetail;
