'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
const Contact: React.FC = () => {
  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: 'Name must be at least 2 characters long',
      })
      .max(100),
    email: z.string().email({
      message: 'Invalid email address',
    }),
    message: z
      .string()
      .min(1, {
        message: 'Message is required',
      })
      .max(1000),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          message: values.message,
          name: values.name,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success(data.message, {
        position: 'bottom-center',
        closeButton: true,
        style: {
          whiteSpace: 'nowrap',
        },

        richColors: true,
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while sending the email.', {
        position: 'bottom-center',
        closeButton: true,
        style: {
          whiteSpace: 'nowrap',
        },
        richColors: true,
      });
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea rows={5} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>
            {form.formState.isSubmitting ? (
              <LoaderCircle className='animate-spin' />
            ) : (
              'Send'
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default Contact;
