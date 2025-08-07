import projectsData from '@/data/projects.json';
import ProjectCard from '@/components/project-card';
import type { Project } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Projects() {
  const projects: Project[] = projectsData;

  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">My Work</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I'm proud to have worked on. Each one represents a unique challenge and a learning opportunity.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="link" asChild>
            <Link href="/admin">
              Admin: Add a new project
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
