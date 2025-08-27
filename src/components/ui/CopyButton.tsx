'use client';

import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type Props = {
  text: string;
  notVisible?: boolean;
  buttonClass?: React.HTMLAttributes<HTMLButtonElement>['className'];
  textClass?: React.HTMLAttributes<HTMLElement>['className'];
};
const CopyButton: React.FC<Props> = ({
  text,
  textClass,
  buttonClass,
  notVisible = false,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text?.toString() || '');
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
      closeButton: true,
      style: {
        whiteSpace: 'nowrap',
      },

      richColors: true,
    });
  };

  return (
    <>
      <button onClick={handleCopy} className={`${cn(buttonClass)} `}>
        {!notVisible && (
          <code className={`${textClass} font-mono text-sm`}>{text}</code>
        )}
        <Copy
          size={20}
          className='opacity-50 transition-opacity duration-200 ease-in absolute right-2 top-4 group-hover:opacity-100'
        />
      </button>
    </>
  );
};
export default CopyButton;
