'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addProject } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  link: z.string().url({ message: 'Please enter a valid project link.' }).optional().or(z.literal('')),
  tags: z.string().min(1, { message: 'Please provide at least one tag.' }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const imageUploadSchema = z.object({
  profileImageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
});

type ImageUploadFormValues = z.infer<typeof imageUploadSchema>;

export default function AdminDashboard() {
  const { toast } = useToast();
  
  const projectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      link: '',
      tags: '',
    },
  });

  const imageForm = useForm<ImageUploadFormValues>({
    resolver: zodResolver(imageUploadSchema),
    defaultValues: {
      profileImageUrl: '',
    },
  });

  const onProjectSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    const result = await addProject(data);
    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your project has been added.',
      });
      projectForm.reset();
    } else {
      toast({
        title: 'Error',
        description: typeof result.error === 'string' ? result.error : 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const onImageSubmit: SubmitHandler<ImageUploadFormValues> = async (data) => {
    // This is a placeholder for the user to provide the URL.
    // The AI will intercept this and use the URL to fetch and save the image.
    toast({
      title: 'Image URL Received!',
      description: 'The AI will now process your image. Please describe the final change you want to make.',
    });
    console.log('Image URL submitted:', data.profileImageUrl);
    imageForm.reset();
  };

  return (
    <div className="min-h-dvh bg-secondary py-12 px-4">
      <div className="container mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
            </Link>
        </Button>
        <div className="grid gap-12 md:grid-cols-1">
          <Card className="max-w-2xl mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Upload Profile Picture</CardTitle>
              <CardDescription>
                If you failed to upload to a service like Imgur, paste a temporary URL to your image here (e.g., from a Google search or another website). 
                I will use it to save the image correctly into your project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...imageForm}>
                <form onSubmit={imageForm.handleSubmit(onImageSubmit)} className="space-y-6">
                  <FormField
                    control={imageForm.control}
                    name="profileImageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={imageForm.formState.isSubmitting} className="w-full">
                    {imageForm.formState.isSubmitting ? 'Uploading...' : 'Upload Image'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="max-w-2xl mx-auto w-full">
            <CardHeader>
              <CardTitle className="text-3xl font-headline">Add New Project</CardTitle>
              <CardDescription>Fill out the form below to add a new project to your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...projectForm}>
                <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-6">
                  <FormField
                    control={projectForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A brief description of your project." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://placehold.co/600x400.png" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Link (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/user/repo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={projectForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Next.js, Tailwind, TypeScript" {...field} />
                        </FormControl>
                         <FormDescription>
                          Enter comma-separated tags.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={projectForm.formState.isSubmitting} className="w-full">
                    {projectForm.formState.isSubmitting ? 'Adding Project...' : 'Add Project'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
