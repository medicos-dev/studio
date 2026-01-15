
'use client';

import ReserveButton from '@/components/ui/reserve-button';
import { MoveRight } from 'lucide-react';

const HeroSection = () => {
    const handleScrollToBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <section className="relative h-[80vh] min-h-[600px] md:h-screen flex items-center justify-center text-center overflow-hidden bg-background">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 dark:opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-accent/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-secondary/30 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter !leading-[1.1] font-headline">
          Asterasia
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          A tranquil escape where artistry and flavor intertwine.
        </p>
        <div className="mt-10">
          <ReserveButton onClick={handleScrollToBooking} suppressHydrationWarning>
            Reserve a Table
            <MoveRight className="ml-2 h-5 w-5" />
          </ReserveButton>
        </div>
      </div>
      
      {/* Foreground decorative shape */}
       <div className="absolute -bottom-20 -right-20 w-72 h-72 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
            fill="hsl(var(--primary) / 0.1)"
            d="M49.4,-57.8C62,-44.9,69.1,-27.7,70.5,-10.1C72,7.5,67.8,25.4,56.8,39.5C45.8,53.6,27.9,63.9,8.9,68.2C-10.1,72.4,-29.2,70.6,-44.7,60.8C-60.2,51,-72.2,33.2,-76.3,13.8C-80.4,-5.6,-76.6,-26.7,-65.8,-41.2C-55,-55.8,-37.2,-63.8,-20.3,-66C-3.3,-68.1,12.7,-64.5,26.4,-62.1C40.1,-59.7,51.4,-59.2,49.4,-57.8Z"
            transform="translate(100 100)"
            />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
