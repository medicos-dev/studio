
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import { AsterasiaLogo } from './icons';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const navItems = [
  { name: 'About', href: '/#about' },
  { name: 'Menu', href: '/#menu' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Reserve', href: '/#booking' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);

      if (pathname !== '/') {
        window.location.href = `/${href}`;
      } else {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled || pathname !== '/'
          ? 'bg-background/60 dark:bg-black/40 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AsterasiaLogo className="h-8 text-primary" />
            <span className="font-headline text-2xl font-bold tracking-tight">
              Asterasia
            </span>
          </Link>

          <nav className="hidden items-center space-x-2 md:flex">
            {navItems.map((item) => (
              <Button key={item.name} variant="ghost" asChild className="rounded-full">
                <Link href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                  {item.name}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-background">
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between border-b pb-4">
                      <Link href="/" className="flex items-center gap-2">
                        <AsterasiaLogo className="h-7 text-primary" />
                      </Link>
                    </div>
                    <nav className="mt-8 flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
