import { TypeAnimation } from 'react-type-animation';
const TextReveal = () => {
  return (
    <div className='h-20 flex justify-center items-center'>
      <TypeAnimation
        sequence={[
          '',
          400,
          'Creating seamless user interfaces,',

          1000,
          'Bringing designs to life with code,',
          1000,
          'Building responsive apps & websites are my area of expertise.',
          1000,
          '✨Welcome to my portfolio!✨',
        ]}
        wrapper='h2'
        // style={{ whiteSpace: 'pre-line' }}
        speed={{ type: 'keyStrokeDelayInMs', value: 23 }}
        className='text-sm md:text-md  font-bold  text-center'
        // repeat={Infinity}
        cursor={false}
      />
    </div>
  );
};

export default TextReveal;
