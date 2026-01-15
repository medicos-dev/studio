
'use client';

import React from 'react';
import { AsterasiaLogo, DribbbleIcon, InstagramIcon, TwitterIcon } from './icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const SocialLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex h-12 w-12 items-center justify-center"
  >
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute transition-transform duration-300 group-hover:scale-110"
    >
      <path
        d="M24.1667 46.6667C13.8817 46.6667 3.33334 40.5284 3.33334 27.5C3.33334 14.4716 11.2333 1.33333 24.1667 1.33333C37.1 1.33333 45 13.1475 45 26.1758C45 39.2042 34.4517 46.6667 24.1667 46.6667Z"
        className="fill-secondary group-hover:fill-accent transition-colors duration-300"
      />
    </svg>
    <div className="relative text-secondary-foreground group-hover:text-accent-foreground">
      {children}
    </div>
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-card py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <AsterasiaLogo className="h-10 text-primary" />
            <p className="mt-4 max-w-xs text-muted-foreground">
              An elegant, warm, and artistic café experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold">Contact</h3>
            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>123 Artisan Street, Creativia</p>
              <p>hello@asterasia.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="mt-4 flex items-center space-x-2">
              <SocialLink href="#">
                <InstagramIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#">
                <TwitterIcon className="h-5 w-5" />
              </SocialLink>
              <SocialLink href="#">
                <DribbbleIcon className="h-5 w-5" />
              </SocialLink>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="mt-6 rounded-full" suppressHydrationWarning>
                  Chat with us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contact Us</DialogTitle>
                  <DialogDescription>
                    Have a question? Fill out the form below and we'll get back to you.
                  </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                  <Input id="name" placeholder="Name" className="rounded-lg" />
                  <Input id="email" type="email" placeholder="Email" className="rounded-lg" />
                  <Textarea placeholder="Your message..." className="rounded-lg"/>
                  <Button type="submit" className="rounded-full">Send Message</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Asterasia Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
