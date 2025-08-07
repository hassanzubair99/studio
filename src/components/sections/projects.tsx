import ProjectCard from '@/components/project-card';
import type { Project } from '@/lib/types';
import { Button } from '../ui/button';
import Link from 'next/link';

// All projects are now managed directly in this file.
// To add, edit, or remove a project, modify the 'projects' list below.
const projects: Project[] = [
  {
    "title": "E-COMMERCE WEBSITE BANDAGE",
    "description": "Welcome to Bandage, where fashion meets thoughtful design and user-friendly experience. Our Summer 2020 drop highlights standout collections for Men, Women, Accessories, and Kids, each built around a fusion of bold Graphic Design and refined aesthetics. Discover our Editor's Picks and Bestseller Products, curated to inspire confidence and timeless style.",
    "imageUrl": "https://i.ibb.co/68gC6D1/p1.png",
    "link": "https://e-commerce-hack-hassan-1uyq.vercel.app/",
    "tags": [
      "Next.js",
      "tailwind css"
    ]
  }
];

export default function Projects() {
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
      </div>
    </section>
  );
}
