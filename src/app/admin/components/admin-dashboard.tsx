'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addProject, deleteProject, updateAboutContent, updateProject } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import type { Project, SiteContent } from '@/lib/types';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"


const projectSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
  imageUrl: z.string().url({ message: 'Please enter a valid image URL.' }),
  link: z.string().url({ message: 'Please enter a valid project link.' }).optional().or(z.literal('')),
  tags: z.string().min(1, { message: 'Please provide at least one tag.' }),
});

const aboutSchema = z.object({
  paragraph1: z.string().min(10, { message: 'Paragraph must be at least 10 characters long.' }),
  paragraph2: z.string().min(10, { message: 'Paragraph must be at least 10 characters long.' }),
});

type ProjectFormValues = z.infer<typeof projectSchema>;
type AboutFormValues = z.infer<typeof aboutSchema>;

interface AdminDashboardProps {
    projects: Project[];
    siteContent: SiteContent;
}

export default function AdminDashboard({ projects, siteContent }: AdminDashboardProps) {
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
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

  const aboutForm = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      paragraph1: siteContent.about.paragraph1 || '',
      paragraph2: siteContent.about.paragraph2 || '',
    },
  });

  const editProjectForm = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
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

  const onEditProjectSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    const originalTitle = editProjectForm.getValues('title'); 
    const result = await updateProject(originalTitle, data);
    if (result.success) {
      toast({
        title: 'Success!',
        description: 'Your project has been updated.',
      });
      setIsEditDialogOpen(false);
    } else {
      toast({
        title: 'Error',
        description: typeof result.error === 'string' ? result.error : 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const onAboutSubmit: SubmitHandler<AboutFormValues> = async (data) => {
    const result = await updateAboutContent(data);
    if (result.success) {
      toast({
        title: 'Success!',
        description: 'The About Me section has been updated.',
      });
    } else {
      toast({
        title: 'Error',
        description: typeof result.error === 'string' ? result.error : 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProject = async (title: string) => {
    const result = await deleteProject(title);
     if (result.success) {
      toast({
        title: 'Project Removed',
        description: `"${title}" has been removed from your portfolio.`,
      });
    } else {
      toast({
        title: 'Error',
        description: typeof result.error === 'string' ? result.error : 'Could not remove project.',
        variant: 'destructive',
      });
    }
  }

  const openEditDialog = (project: Project) => {
    editProjectForm.reset({
        ...project,
        tags: project.tags.join(', '),
    });
    setIsEditDialogOpen(true);
  }

  return (
    <div className="min-h-dvh bg-background py-12 px-4">
      <div className="container mx-auto">
        <Button asChild variant="ghost" className="mb-8">
            <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
            </Link>
        </Button>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="grid gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-headline">Manage Projects</CardTitle>
                <CardDescription>Edit or remove existing projects from your portfolio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.length > 0 ? (
                  projects.map(project => (
                    <div key={project.title} className="flex items-center justify-between p-2 rounded-md border">
                      <div className="flex items-center gap-4">
                        <Image src={project.imageUrl} alt={project.title} width={64} height={64} className="rounded-md object-cover aspect-square" />
                        <div>
                            <p className="font-semibold">{project.title}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Dialog open={isEditDialogOpen && editProjectForm.getValues('title') === project.title} onOpenChange={(isOpen) => { if (!isOpen) setIsEditDialogOpen(false)}}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon" onClick={() => openEditDialog(project)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Project</DialogTitle>
                                    <DialogDescription>
                                        Update the details for your project. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...editProjectForm}>
                                    <form onSubmit={editProjectForm.handleSubmit(onEditProjectSubmit)} className="space-y-4">
                                         <FormField
                                            control={editProjectForm.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Project Title</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                            <FormField
                                            control={editProjectForm.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                            <FormField
                                            control={editProjectForm.control}
                                            name="imageUrl"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                            <FormField
                                            control={editProjectForm.control}
                                            name="link"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Project Link</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                            <FormField
                                            control={editProjectForm.control}
                                            name="tags"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Tags</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormDescription>Comma-separated tags</FormDescription>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                            />
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">Cancel</Button>
                                            </DialogClose>
                                            <Button type="submit" disabled={editProjectForm.formState.isSubmitting}>
                                                {editProjectForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project
                                "{project.title}" from your portfolio.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteProject(project.title)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">You have not added any projects yet.</p>
                )}
              </CardContent>
            </Card>

            <Card>
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

          <div className="grid gap-12">
            <Card>
                <CardHeader>
                <CardTitle className="text-3xl font-headline">Edit "About Me"</CardTitle>
                <CardDescription>Update the description in the "About Me" section.</CardDescription>
                </CardHeader>
                <CardContent>
                <Form {...aboutForm}>
                    <form onSubmit={aboutForm.handleSubmit(onAboutSubmit)} className="space-y-6">
                    <FormField
                        control={aboutForm.control}
                        name="paragraph1"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Paragraph</FormLabel>
                            <FormControl>
                            <Textarea rows={5} placeholder="Hello! I'm..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={aboutForm.control}
                        name="paragraph2"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Second Paragraph</FormLabel>
                            <FormControl>
                            <Textarea rows={5} placeholder="I thrive in..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={aboutForm.formState.isSubmitting} className="w-full">
                        {aboutForm.formState.isSubmitting ? 'Updating...' : 'Update About Section'}
                    </Button>
                    </form>
                </Form>
                </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
