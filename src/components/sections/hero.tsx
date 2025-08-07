import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="h-dvh flex items-center justify-center text-center relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-person-coding-at-night-4409/1080p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-background/80"></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="container mx-auto px-4 z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-headline text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-primary to-yellow-300 pb-4">
          M. Hassan Zubair
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          A passionate Full Stack Developer transforming ideas into powerful and user-friendly web applications.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="#projects">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 animate-bounce z-10">
         <Link href="#about" aria-label="Scroll down">
            <ArrowDown className="h-8 w-8 text-primary" />
         </Link>
      </div>
    </section>
  );
}
