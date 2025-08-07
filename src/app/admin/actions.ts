'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Project } from '@/lib/types';
import type { SiteContent } from '@/lib/types';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  imageUrl: z.string().url('Must be a valid URL.'),
  link: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  tags: z.string().min(1, 'Tags are required.'),
});

const aboutSchema = z.object({
  paragraph1: z.string().min(1, 'Paragraph 1 is required.'),
  paragraph2: z.string().min(1, 'Paragraph 2 is required.'),
});

const projectsFilePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
const siteContentFilePath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');

async function readProjects(): Promise<Project[]> {
  const fileContent = await fs.readFile(projectsFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function writeProjects(projects: Project[]) {
  await fs.writeFile(projectsFilePath, JSON.stringify(projects, null, 2));
}

async function readSiteContent(): Promise<SiteContent> {
  const fileContent = await fs.readFile(siteContentFilePath, 'utf-8');
  return JSON.parse(fileContent);
}

async function writeSiteContent(content: SiteContent) {
    await fs.writeFile(siteContentFilePath, JSON.stringify(content, null, 2));
}

export async function addProject(projectData: unknown) {
  const result = projectSchema.safeParse(projectData);

  if (!result.success) {
    return { success: false, error: result.error.flatten().fieldErrors };
  }

  const newProject: Project = {
    ...result.data,
    tags: result.data.tags.split(',').map(tag => tag.trim()),
    link: result.data.link || '#',
  };

  try {
    const projects = await readProjects();
    projects.unshift(newProject);
    await writeProjects(projects);

    revalidatePath('/');
    revalidatePath('/admin');
    return { success: true, message: 'Project added successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to add project due to a server error.' };
  }
}

export async function deleteProject(title: string) {
    try {
        let projects = await readProjects();
        projects = projects.filter(p => p.title !== title);
        await writeProjects(projects);

        revalidatePath('/');
        revalidatePath('/admin');
        return { success: true, message: 'Project removed successfully!' };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to remove project due to a server error.' };
    }
}

export async function updateAboutContent(aboutData: unknown) {
    const result = aboutSchema.safeParse(aboutData);

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors };
    }

    try {
        const siteContent = await readSiteContent();
        siteContent.about = result.data;
        await writeSiteContent(siteContent);
        
        revalidatePath('/');
        return { success: true, message: 'About content updated successfully!' };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to update content due to a server error.' };
    }
}
