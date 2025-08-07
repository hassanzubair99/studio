import { Code, Server, Database, Smartphone, Brush, Cloud, Terminal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skills = [
  { name: 'Frontend', icon: <Code className="h-8 w-8 text-primary" />, description: 'React, Next.js, TypeScript, Tailwind CSS' },
  { name: 'Backend', icon: <Server className="h-8 w-8 text-primary" />, description: 'Node.js, Express, Python, Django' },
  { name: 'Databases', icon: <Database className="h-8 w-8 text-primary" />, description: 'MongoDB, PostgreSQL, MySQL, Firebase' },
  { name: 'Mobile', icon: <Smartphone className="h-8 w-8 text-primary" />, description: 'React Native, Flutter' },
  { name: 'UI/UX Design', icon: <Brush className="h-8 w-8 text-primary" />, description: 'Figma, Adobe XD, User-Centered Design' },
  { name: 'DevOps', icon: <Cloud className="h-8 w-8 text-primary" />, description: 'Docker, AWS, Google Cloud, Vercel' },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">My Skills</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            I have experience with a diverse range of technologies, allowing me to build robust and scalable applications.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <Card key={skill.name} className="text-center transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto bg-secondary p-4 rounded-full w-fit">
                    {skill.icon}
                </div>
                <CardTitle className="mt-4 font-headline text-2xl">{skill.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{skill.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
