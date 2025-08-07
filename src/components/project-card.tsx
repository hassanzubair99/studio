import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project & { aiHint?: string };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 border-border/50">
      <CardHeader>
        <div className="aspect-video relative overflow-hidden rounded-t-lg -mt-6 -mx-6">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.aiHint || 'project screenshot'}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-2xl font-headline font-bold">{project.title}</CardTitle>
        <CardDescription className="mt-2 text-muted-foreground">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
         <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        {project.link && (
          <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary">
            <Link href={project.link} target="_blank" rel="noopener noreferrer" className='flex items-center gap-2'>
              View Project <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
