import { cn } from '@/lib/utils';

const skills = [
  { name: 'React', logo: <NextJsLogo className="h-12 w-12" /> },
  { name: 'Next.js', logo: <NextJsLogo className="h-12 w-12" /> },
  { name: 'TypeScript', logo: <TypeScriptLogo className="h-12 w-12" /> },
  { name: 'JavaScript', logo: <JavaScriptLogo className="h-12 w-12" /> },
  { name: 'Node.js', logo: <NodeJsLogo className="h-12 w-12" /> },
  { name: 'Tailwind CSS', logo: <TailwindCssLogo className="h-12 w-12" /> },
  { name: 'Firebase', logo: <FirebaseLogo className="h-12 w-12" /> },
  { name: 'Python', logo: <PythonLogo className="h-12 w-12" /> },
  { name: 'Django', logo: <DjangoLogo className="h-12 w-12" /> },
  { name: 'MongoDB', logo: <MongoDbLogo className="h-12 w-12" /> },
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
        <div
          className="relative mt-12 w-full overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
        >
          <div className="flex animate-scroll">
            {[...skills, ...skills].map((skill, index) => (
              <div key={index} className="flex-shrink-0 w-48 h-32 flex flex-col items-center justify-center gap-2 text-center p-4">
                {skill.logo}
                <span className="font-medium text-muted-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// SVG Logo Components

function NextJsLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-black dark:text-white", className)} viewBox="0 0 128 128" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 0C28.653 0 0 28.653 0 64s28.653 64 64 64 64-28.653 64-64S99.347 0 64 0zm0 119.58C33.12 119.58 8.42 94.88 8.42 64S33.12 8.42 64 8.42c30.88 0 55.58 24.7 55.58 55.58S94.88 119.58 64 119.58z" />
      <path d="M93.31 42.434H80.223L58.05 68.85v-18.3H48.875v42.82h9.176V70.838l25.32-28.404z" />
      <path d="M96.75 83.37h9.176v-8.388h-9.176z" />
    </svg>
  );
}

function TypeScriptLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-[#3178C6]", className)} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 1.5h21v21h-21z" fill="#fff" stroke="#3178C6" strokeWidth="3" />
      <path d="M13.4 15.6l-3.6-3.6h5.4v-1.8H7.2v1.8l3.6 3.6h-5.4v1.8h10.8zM21.9 19.5h-5.4v-1.8h5.4z" />
    </svg>
  );
}

function JavaScriptLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-black dark:text-white", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="#F7DF1E" />
      <path d="M8.2 12.3c0-1.8.8-2.8 2.5-2.8 1.6 0 2.3.9 2.3 2.1v.2h-1.8v-.2c0-.6-.3-1-.8-1-.6 0-.9.4-.9 1.1v.1h3.5v3.4c0 1.9-1 3-2.8 3-1.8 0-2.8-1.1-2.8-2.9v-.1zm1.8 3.2c0 .7.4 1.2 1 1.2s1-.5 1-1.2v-1.5H10v1.5zm6.5-6c0-1.6.8-2.6 2.5-2.6 1.7 0 2.4 1 2.4 2.6v3.1h-1.8V12c0-.6-.2-1-.8-1-.6 0-.9.4-.9 1v3.4h-1.8V9.5h1.8v.9z" fill="#000" />
    </svg>
  );
}

function NodeJsLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-[#68A063]", className)} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M128.2 0C57.4 0 0 57.4 0 128.2s57.4 128.2 128.2 128.2 128.2-57.4 128.2-128.2S199 .6 128.2 0zm57.1 184.6c-4.3 8-11.3 14-20.3 17.6-9 3.6-19.2 4.6-29.3 2.8-10.1-1.8-19.4-6.3-27.1-13-5.2-4.6-9.1-10.3-11.2-16.6l-.2-1-8.1 4.7-.5.3-22.1 12.8c-2 1.1-4.4.6-5.5-1.4s-.6-4.4 1.4-5.5l22.1-12.8 19.9-11.5c-1-16.7 3.8-33.1 13.8-46.3 7.8-10.3 18.3-18.4 30.1-23.4l-2.5-4.4c-1-1.7-.3-3.9 1.4-4.9 1.7-1 3.9-.3 4.9 1.4l2.5 4.4c4.6-1.5 9.4-2.2 14.2-2.3h.2c16.3 0 31.4 6.8 42.4 18.6 10.9 11.6 16.6 27.2 16.6 43.6-.1 16.2-6.5 31.9-17.7 43.4zm-22.1-99.2c-7.9-8.4-18.6-13.4-30-13.4h-.2c-10.7 0-20.8 4.4-28.3 12-7.8 8-12.4 18.7-12.4 30.1s4.5 21.8 12.1 29.6c7.5 7.6 17.6 12 28.5 12.2 10.9.1 21.3-4.1 28.8-11.7 7.7-7.7 12.1-18 12.1-29.2.1-11.4-4.3-22.4-12.6-30.6z" />
    </svg>
  );
}

function TailwindCssLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-[#38BDF8]", className)} viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm64 128c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-35.3 53.3-64 64-64 17.7 0 32 14.3 32 32zm-96-32c0-17.7 14.3-32 32-32s32 14.3 32 32c0 35.3-53.3 64-64 64-17.7 0-32-14.3-32-32z" />
    </svg>
  );
}

function FirebaseLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-white", className)} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h256v256H0z" fill="#039BE5" />
      <path d="M103.7 154.5l-63-112.7 101-38.3z" fill="#FFC107" />
      <path d="M103.7 154.5L40.7 41.8 4 196.2z" fill="#FFA000" />
      <path d="M103.7 154.5l68.6 62.1 24-175.1z" fill="#F57C00" />
      <path d="M4 196.2l99.7-41.7 68.6 62.1z" fill="#E65100" />
    </svg>
  );
}

function PythonLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-black dark:text-white", className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9 17.5c-2.8 0-5-2.2-5-5s2.2-5 5-5h3v2H9c-1.7 0-3 1.3-3 3s1.3 3 3 3h3v2H9zm6 0v-2h3c1.7 0 3-1.3 3-3s-1.3-3-3-3h-3V7.5h3c2.8 0 5 2.2 5 5s-2.2 5-5 5h-3z" fill="#306998" />
      <path d="M9 17.5v-2h3c1.7 0 3-1.3 3-3s-1.3-3-3-3H9V7.5h3c2.8 0 5 2.2 5 5s-2.2 5-5 5h-3z" fill="#FFD43B" />
    </svg>
  );
}

function DjangoLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-[#092E20]", className)} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.6 18.9c.7 1.6 1.7 3.1 3 4.2C7 24.3 8.7 25 10.5 25s3.5-.7 4.9-2c1.4-1.2 2.4-2.8 3.1-4.4.7-1.6 1.1-3.4 1.1-5.3V2.5h-5.2v12.2c0 1.2-.2 2.3-.7 3.2-.5.9-1.2 1.7-2.2 2.1-1 .5-2.2.7-3.5.3-1.3-.3-2.4-1.1-3.1-2.2-.8-1.1-1.2-2.5-1.2-4V2.5H1.6v12.8c0 1.8.4 3.5 1 5.1z" />
    </svg>
  );
}

function MongoDbLogo({ className }: { className?: string }) {
  return (
    <svg className={cn("text-[#47A248]", className)} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 15c-3 .5-4.5-1.5-4.5-4.5s1.5-5 4.5-4.5v9zm2 0V8.5c3 .5 4.5 2 4.5 4.5s-1.5 5-4.5 4.5z" />
    </svg>
  );
}