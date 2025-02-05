import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className='mx-auto container px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20'>
      {children}
    </div>
  );
};

export default Container;
