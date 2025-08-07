'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import type { Project } from '@/lib/types';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
  imageUrl: z.string().url('Must be a valid URL.'),
  link: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
  tags: z.string().min(1, 'Tags are required.'),
});

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

  const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const projects: Project[] = JSON.parse(fileContent);

    projects.unshift(newProject);

    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));

    revalidatePath('/');
    return { success: true, message: 'Project added successfully!' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to add project due to a server error.' };
  }
}
