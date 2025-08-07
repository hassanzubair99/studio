'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data); // In a real app, you'd send this data to a server
    toast({
      title: 'Message Sent!',
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    reset();
  };

  return (
    <section id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">Contact Me</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-muted-foreground">hassanzubair4243@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-muted-foreground">+92 3705965670</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold">Location</h3>
                <p className="text-muted-foreground">Remote | Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-medium">Name</label>
                  <Input id="name" placeholder="Your Name" {...register('name', { required: true })} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your Email" {...register('email', { required: true })} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-medium">Message</label>
                  <Textarea id="message" placeholder="Your Message" rows={5} {...register('message', { required: true })} />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
