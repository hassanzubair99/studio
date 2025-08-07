import { useState } from 'react';
import AdminDashboard from './components/admin-dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import fs from 'fs/promises';
import path from 'path';
import type { Project, SiteContent } from '@/lib/types';
import AdminLogin from './components/admin-login';

async function getProjects(): Promise<Project[]> {
    const filePath = path.join(process.cwd(), 'src', 'data', 'projects.json');
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent) as Project[];
    } catch (error) {
        // If the file doesn't exist or is empty, return an empty array
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            return [];
        }
        console.error("Failed to read projects:", error);
        return [];
    }
}

async function getSiteContent(): Promise<SiteContent> {
    const filePath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as SiteContent;
}


export default async function AdminPage() {
  const projects = await getProjects();
  const siteContent = await getSiteContent();

  return (
    <AdminLogin>
        <AdminDashboard projects={projects} siteContent={siteContent} />
    </AdminLogin>
  );
}
