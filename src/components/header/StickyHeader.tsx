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

  return (
    <aside
      className={`transition-all h-fit  duration-300 w-64  ${
        isSticky ? 'sticky top-20' : '  top-0'
      }`}
    >
      <Card className={`relative shadow-lg min-h-60 `}>
        <div className='shadow-xl rounded-xl flex mx-auto w-fit relative mt-[-60px] overflow-hidden'>
          <Image
            className='object-cover aspect-square'
            loading='lazy'
            about='Halil Ibrahim'
            width={200}
            height={200}
            src='/halil-ibrahim.jpg'
            alt='logo'
          />
        </div>

        <div className='flex mt-4 items-center justify-center'>
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
                  href={'https://github.com/halilibrahimcelik/'}
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
                  href={'https://www.linkedin.com/in/halil-ibrahim-celik/'}
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
                  href={'https://www.reddit.com/user/vaydaglar/'}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <RedditIcon />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </aside>
  );
};

export default StickyHeader;
