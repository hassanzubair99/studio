import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { SiteContent } from '@/lib/types';

// The "About Me" content is now managed directly in this file.
const about = {
  paragraph1: "I am Hassan Zubair, an ambitious IT Developer and AI Website Maker based in Karachi, Pakistan. With a passion for building modern, responsive, and animated websites, I specialize in technologies like React.js, Next.js, and Tailwind CSS. I also develop and customize websites using Odoo for small businesses. My skill set includes AI tool integration and website automation, allowing me to create smart, user-centric digital experiences. I’ve received recognition for both leadership and communication, highlighting my ability to work effectively in teams and deliver exceptional results.",
  paragraph2: "Currently pursuing my Matriculation, I’m driven by the dream of launching a globally recognized tech company like Microsoft or Google. I constantly push myself to learn, innovate, and contribute to cutting-edge web and AI development projects. With creativity, problem-solving skills, and a strong work ethic, I strive to make a lasting impact in the tech world. You can view my work at hassan-portfolio-three.vercel.app."
}

export default function About() {
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
