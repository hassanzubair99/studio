'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Code } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="#home" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Code className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold font-headline">M.Hassan Zubair</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button key={item.name} asChild variant="ghost">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
             <Button asChild>
                <Link href="#contact">Hire Me</Link>
              </Button>
          </nav>
          <div className="md:hidden">
            <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm">
          <nav className="flex flex-col items-center gap-4 py-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                {item.name}
              </Link>
            ))}
             <Button asChild>
                <Link href="#contact" onClick={() => setIsOpen(false)}>Hire Me</Link>
              </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
