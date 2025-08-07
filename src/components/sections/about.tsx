import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import fs from 'fs/promises';
import path from 'path';
import type { SiteContent } from '@/lib/types';

async function getSiteContent(): Promise<SiteContent> {
    const filePath = path.join(process.cwd(), 'src', 'data', 'siteContent.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent) as SiteContent;
}

export default async function About() {
  const siteContent = await getSiteContent();
  const { about } = siteContent;

  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            <Card className="overflow-hidden shadow-2xl shadow-primary/10 animate-float">
              <CardContent className="p-0">
                <Image
                  src="https://i.ibb.co/1fg7gQ44/image-400x500-1.png"
                  alt="M. Hassan Zubair"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  data-ai-hint="professional portrait"
                />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-3">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-primary">About Me</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {about.paragraph1}
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              {about.paragraph2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
