import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2">
            <Card className="overflow-hidden shadow-2xl shadow-primary/10 animate-float">
              <CardContent className="p-0">
                <Image
                  src="/profile.jpg"
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
              Hello! I'm Hassan, a dedicated developer with a knack for building elegant and efficient solutions. My journey in tech started with a simple "Hello, World!" and has since evolved into a passion for crafting complete web experiences, from the server logic to the pixel-perfect frontend.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              I thrive in collaborative environments and am always eager to learn new technologies to stay at the forefront of web development. When I'm not coding, I enjoy exploring new coffee shops and contributing to open-source projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
