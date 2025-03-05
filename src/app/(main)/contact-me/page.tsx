import { Heading, Text } from '@/components/theme/typography';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: 'Halil | About Me',
  description: 'Little bit about me.',
};
const ContactUsPage: NextPage = () => {
  return (
    <main>
      <Heading variant='h1'>Hello, World!</Heading>
      <Text>This is my contact us page.</Text>
      <Text>Here you can learn more about me and my background.</Text>
      <Text>Stay tuned for updates!</Text>
    </main>
  );
};
export default ContactUsPage;
