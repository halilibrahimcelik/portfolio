'use client';
import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import { Heading } from '../theme/typography';
import Link from 'next/link';
import { Button } from '../ui/button';
import RedditIcon from '../icons/RedditIcon';
import GithubIcon from '../icons/GithubIcon';
import LinkedinIcon from '../icons/LinkedinIcon';
import TextReveal from './TextPrompt';
import { MailIcon, MapPinHouse } from 'lucide-react';
import { SocialMedia } from '@/types';
import { toast } from 'sonner';

const StickyHeader: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 140;
      setIsSticky(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SocialMedia.EMAIL);

    toast.success('Email copied to clipboard', {
      position: 'bottom-center',
      cancel: (
        <Button
          onClick={() => toast.dismiss()}
          className='absolute bottom-1 right-1'
          size={'sm'}
          variant={'ghost'}
        >
          Dismiss
        </Button>
      ),

      icon: '📋',

      richColors: true,
    });
  };
  return (
    <aside
      className={`transition-all h-fit  duration-300 w-64  ${
        isSticky ? 'sticky top-20' : '  top-0'
      }`}
    >
      <Card className={`relative shadow-lg min-h-60 `}>
        <div className='shadow-xl rounded-xl flex mx-auto w-fit relative mt-[-60px] overflow-hidden'>
          <Image
            priority
            className='object-cover aspect-square'
            about='Halil Ibrahim'
            width={200}
            height={200}
            src='/halil-ibrahim.jpg'
            alt='logo'
          />
        </div>

        <div className='flex  items-center justify-center'>
          <div>
            <Heading variant='h5' className='text-center font-bold'>
              Halil İbrahim Celik
            </Heading>
            <div className='flex gap-2 justify-center mt-2'>
              <Button asChild variant={'secondary'} size={'icon'}>
                <Link
                  aria-label='Github'
                  about='Github'
                  title='Github'
                  href={SocialMedia.GITHUB}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <GithubIcon width='60' height='60' />
                </Link>
              </Button>
              <Button asChild variant={'secondary'} size={'icon'}>
                <Link
                  aria-label='Linkedin'
                  about='Linkedin'
                  title='Linkedin'
                  href={SocialMedia.LINKEDIN}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <LinkedinIcon />
                </Link>
              </Button>
              <Button asChild variant={'secondary'} size={'icon'}>
                <Link
                  aria-label='Reddit'
                  about='Reddit'
                  title='Reddit'
                  href={SocialMedia.REDDIT}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <RedditIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <TextReveal />
        </div>
        <div className='bg-secondary py-3 px-2 text-secondary-foreground shadow-sm rounded-xl '>
          <button
            onClick={handleCopyEmail}
            title='Copy Email'
            className='text-xs flex items-center gap-2 p-1 rounded-xl  hover:bg-background  dark:hover:bg-foreground hover:text-primary-foreground'
          >
            {' '}
            <MailIcon size={24} />
            <span>{SocialMedia.EMAIL}</span>
          </button>

          <hr className='my-2' />
          <div className='flex items-center gap-2 p-1'>
            <MapPinHouse size={24} />

            <span className='text-xs text-center'>London, UK</span>
          </div>
          <hr className='my-2' />
          <div>
            <Button className='w-full text-center' variant={'default'}>
              Contact Me !
            </Button>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default StickyHeader;
