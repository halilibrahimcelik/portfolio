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
import { DownloadIcon, MailIcon, MapPinHouse } from 'lucide-react';
import { SocialMedia } from '@/types';
import { toast } from 'sonner';
import TextReveal from './TextPrompt';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ClickSpark from '../ClickSpark/ClickSpark';
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
      closeButton: true,
      style: {
        whiteSpace: 'nowrap',
      },

      richColors: true,
    });
  };
  return (
    <aside
      className={`transition-all h-fit animate-appear  duration-300 lg:w-64  ${
        isSticky ? 'lg:sticky lg:top-20' : '  top-0'
      }`}
    >
      <Card
        className={`relative flex flex-col sm:flex-row gap-0 sm:gap-2 lg:block shadow-lg min-h-60 `}
      >
        <div>
          <div className='shadow-xl rounded-xl flex mx-auto w-fit relative lg:mt-[-60px] overflow-hidden'>
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
        </div>
        <div className='flex-1'>
          <div>
            <TextReveal />
          </div>
          <div className='bg-secondary  py-3 px-2 text-secondary-foreground shadow-sm rounded-xl '>
            <ClickSpark sparkColor='#111'>
              <button
                onClick={handleCopyEmail}
                title='Copy Email'
                className='text-xs  flex w-full  items-center transition-all ease-in duration-200 gap-2 px-2 py-1 rounded-xl  hover:bg-background  dark:hover:bg-foreground hover:text-primary-foreground'
              >
                {' '}
                <MailIcon size={18} />
                <span>{SocialMedia.EMAIL}</span>
              </button>
            </ClickSpark>
            <hr className='my-2' />
            <div className='flex items-center gap-2 px-2 py-1'>
              <MapPinHouse size={18} />
              <span className='text-xs text-center'>
                London, United Kingdom
              </span>
            </div>

            <hr className='my-2' />
            <div className='flex flex-col gap-4'>
              <Button
                asChild
                className='w-full text-center'
                variant={'default'}
              >
                <Link href={'contact-me'}>Contact Me!</Link>
              </Button>

              <Dialog>
                <DialogTrigger className='hidden lg:flex' asChild>
                  <Button className='w-full text-center' variant={'default'}>
                    {/* <a href='/cv.pdf' download target='_blank'> */}
                    <DownloadIcon size={24} />
                    Download CV
                    {/* </a> */}
                  </Button>
                </DialogTrigger>
                <DialogContent className=''>
                  <div className='iframe-container border border-gray-200 rounded-lg p-4'>
                    <DialogTitle>CV</DialogTitle>
                    <iframe
                      src='/cv.pdf'
                      className='  responsive-iframe'
                      title='CV PDF'
                      loading='lazy'
                    />
                    {/* <a
                      href='/cv.pdf'
                      download='Halil-Ibrahim-Celik-CV.pdf'
                      className='absolute bottom-4 right-8 bg-primary text-primary-foreground px-3 py-2 rounded-md text-sm flex items-center gap-1 shadow-md z-10'
                    >
                      <DownloadIcon size={16} />
                      Download
                    </a> */}
                  </div>
                </DialogContent>
              </Dialog>
              <Button
                asChild
                className='w-full text-center lg:hidden'
                variant={'default'}
              >
                <a href='/cv.pdf' target='_blank'>
                  <DownloadIcon size={18} />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default StickyHeader;
