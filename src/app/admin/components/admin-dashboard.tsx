'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Project, SiteContent } from '@/lib/types';
import { getProjects, addProject, updateProject, deleteProject, getAboutContent, updateAboutContent } from '@/lib/firebase-service';
import Image from 'next/image';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('Must be a valid URL'),
  link: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  tags: z.string().min(1, 'Tags are required'),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const aboutSchema = z.object({
    paragraph1: z.string().min(1, "Paragraph 1 is required"),
    paragraph2: z.string().min(1, "Paragraph 2 is required"),
});

type AboutFormData = z.infer<typeof aboutSchema>;


export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutContent, setAboutContent] = useState<SiteContent['about']>({ paragraph1: '', paragraph2: '' });
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const { toast } = useToast();

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const aboutForm = useForm<AboutFormData>({
    resolver: zodResolver(aboutSchema)
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (aboutContent.paragraph1 || aboutContent.paragraph2) {
      aboutForm.reset(aboutContent);
    }
  }, [aboutContent, aboutForm]);

  async function fetchData() {
    try {
      const projectsData = await getProjects();
      const aboutData = await getAboutContent();
      setProjects(projectsData);
      setAboutContent(aboutData);
    } catch (error) {
      toast({ title: 'Error fetching data', description: String(error), variant: 'destructive' });
    }
  }

  const handleProjectSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    try {
      const projectData = { ...data, tags: data.tags.split(',').map(tag => tag.trim()) };
      if (editingProject) {
        await updateProject(editingProject.id!, projectData);
        toast({ title: 'Success', description: 'Project updated successfully.' });
      } else {
        await addProject(projectData);
        toast({ title: 'Success', description: 'Project added successfully.' });
      }
      await fetchData();
      closeProjectDialog();
    } catch (error) {
      toast({ title: 'Error', description: `Failed to ${editingProject ? 'update' : 'add'} project.`, variant: 'destructive' });
    }
  };
  
  const handleAboutSubmit: SubmitHandler<AboutFormData> = async (data) => {
    try {
        await updateAboutContent(data);
        toast({ title: 'Success', description: 'About content updated successfully.' });
        await fetchData();
    } catch (error) {
        toast({ title: 'Error', description: 'Failed to update about content.', variant: 'destructive' });
    }
  };

  const openProjectDialog = (project: Project | null = null) => {
    setEditingProject(project);
    if (project) {
      projectForm.reset({ ...project, tags: project.tags.join(', ') });
    } else {
      projectForm.reset({ title: '', description: '', imageUrl: '', link: '', tags: '' });
    }
    setIsProjectDialogOpen(true);
  };

  const closeProjectDialog = () => {
    setIsProjectDialogOpen(false);
    setEditingProject(null);
    projectForm.reset();
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        toast({ title: 'Success', description: 'Project deleted successfully.' });
        await fetchData();
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to delete project.', variant: 'destructive' });
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* About Me Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Edit "About Me"</CardTitle>
          <CardDescription>Update the content of your about section.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={aboutForm.handleSubmit(handleAboutSubmit)} className="space-y-4">
            <div>
              <label>Paragraph 1</label>
              <Textarea {...aboutForm.register('paragraph1')} rows={5} />
              {aboutForm.formState.errors.paragraph1 && <p className="text-destructive text-sm mt-1">{aboutForm.formState.errors.paragraph1.message}</p>}
            </div>
            <div>
              <label>Paragraph 2</label>
              <Textarea {...aboutForm.register('paragraph2')} rows={5} />
               {aboutForm.formState.errors.paragraph2 && <p className="text-destructive text-sm mt-1">{aboutForm.formState.errors.paragraph2.message}</p>}
            </div>
            <Button type="submit">Save About Content</Button>
          </form>
        </CardContent>
      </Card>


      {/* Projects Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Projects</CardTitle>
              <CardDescription>Add, edit, or remove your projects.</CardDescription>
            </div>
            <Button onClick={() => openProjectDialog()}>Add New Project</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="aspect-video relative">
                    <Image src={project.imageUrl} alt={project.title} fill className="object-cover rounded-t-lg" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mt-2">{project.title}</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1 h-20 overflow-hidden text-ellipsis">{project.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => openProjectDialog(project)}>Edit</Button>
                  <Button variant="destructive" onClick={() => handleDeleteProject(project.id!)}>Delete</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-4">
            <div>
              <label>Title</label>
              <Input {...projectForm.register('title')} />
              {projectForm.formState.errors.title && <p className="text-destructive text-sm mt-1">{projectForm.formState.errors.title.message}</p>}
            </div>
            <div>
              <label>Description</label>
              <Textarea {...projectForm.register('description')} />
              {projectForm.formState.errors.description && <p className="text-destructive text-sm mt-1">{projectForm.formState.errors.description.message}</p>}
            </div>
            <div>
              <label>Image URL</label>
              <Input {...projectForm.register('imageUrl')} />
              {projectForm.formState.errors.imageUrl && <p className="text-destructive text-sm mt-1">{projectForm.formState.errors.imageUrl.message}</p>}
            </div>
            <div>
              <label>Project Link</label>
              <Input {...projectForm.register('link')} />
              {projectForm.formState.errors.link && <p className="text-destructive text-sm mt-1">{projectForm.formState.errors.link.message}</p>}
            </div>
             <div>
              <label>Tags (comma-separated)</label>
              <Input {...projectForm.register('tags')} />
              {projectForm.formState.errors.tags && <p className="text-destructive text-sm mt-1">{projectForm.formState.errors.tags.message}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={closeProjectDialog}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
