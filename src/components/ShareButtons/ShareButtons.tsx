'use client';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import LinkedinIcon from '../icons/LinkedinIcon';
import TwitterIcon from '../icons/TwitterIcon';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Copied to clipboard!', {
      position: 'bottom-center',
      closeButton: true,
      style: {
        whiteSpace: 'nowrap',
      },

      richColors: true,
    });
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank');
  };

  const handleShareX = () => {
    const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    window.open(xUrl, '_blank');
  };
  return (
    <div className='flex gap-2'>
      <Button
        title='Copy to clipboard'
        size={'icon'}
        onClick={handleCopyUrl}
        aria-label='Copy to clipboard'
      >
        <Copy />
      </Button>
      <Button
        title='Share on LinkedIn'
        size={'icon'}
        onClick={handleShareLinkedIn}
        aria-label='Share on LinkedIn'
      >
        <LinkedinIcon />
      </Button>
      <Button
        title='Share on X'
        size={'icon'}
        onClick={handleShareX}
        aria-label='Share on X'
      >
        <TwitterIcon />
      </Button>
    </div>
  );
};
export default ShareButtons;
