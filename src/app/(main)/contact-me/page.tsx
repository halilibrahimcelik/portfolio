import Ballpit from '@/components/Ballpit/Ballpit';
import Contact from '@/components/Contact/Contact';
import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Contact Me',
  description: 'Feel free to reach out to me for any inquiries.',
};
const ContactUsPage: NextPage = () => {
  return (
    <div className='relative'>
      <Heading variant='h2'>Contact Me</Heading>
      <hr className='mt-1 mb-4' />
      <Text>If you have any questions, feel free to reach out!</Text>
      <div
        style={{
          overflow: 'hidden',
          position: 'absolute',
          opacity: 0.5,

          top: '0',
          left: '0',
          right: '0',
          bottom: '0',

          width: '100%',
        }}
      >
        <Ballpit
          colors={['#FF5733', '#33FF57', '#3357FF', '#F1C40F']}
          count={30}
          gravity={0.7}
          friction={0.95}
          wallBounce={1}
          followCursor={false}
        />
      </div>
      <Contact />
    </div>
  );
};
export default ContactUsPage;
