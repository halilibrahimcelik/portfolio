import Contact from '@/components/Contact/Contact';
import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | Contact Me',
  description: 'Feel free to reach out to me for any inquiries.',
};
const ContactUsPage: NextPage = () => {
  return (
    <main>
      <Heading variant='h2'>Contact Me</Heading>
      <hr className='mt-1 mb-4' />
      <Text>If you have any questions, feel free to reach out!</Text>
      <Contact />
    </main>
  );
};
export default ContactUsPage;
