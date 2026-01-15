
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));
const homePageGalleryImages = galleryImages.slice(0, 3); // Use 3 images now

// Helper component to prevent hydration mismatch from Math.random()
const GalleryImage = ({
  img,
  index,
  onImageClick,
  className,
}: {
  img: (typeof galleryImages)[0];
  index: number;
  onImageClick: (url: string) => void;
  className?: string;
}) => {
  const [borderRadius, setBorderRadius] = useState<string | undefined>(undefined);

  useEffect(() => {
    // This code now only runs on the client, after the component has mounted
    setBorderRadius(
      `${Math.random() * 40 + 40}% ${Math.random() * 40 + 40}% ${
        Math.random() * 40 + 40
      }% ${Math.random() * 40 + 40}% / ${Math.random() * 40 + 40}% ${
        Math.random() * 40 + 40
      }% ${Math.random() * 40 + 40}% ${Math.random() * 40 + 40}%`
    );
  }, []);

  return (
    <DialogTrigger asChild onClick={() => onImageClick(img.imageUrl)}>
      <div
        className={cn(
          'group relative overflow-hidden bg-muted cursor-pointer',
          'transform transition-transform duration-500 ease-in-out hover:scale-105',
          className
        )}
        style={{
          borderRadius: borderRadius,
        }}
      >
        <Image
          src={img.imageUrl}
          alt={img.description}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          data-ai-hint={img.imageHint}
          className="object-cover"
        />
      </div>
    </DialogTrigger>
  );
};


const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">Visual Ambiance</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the soul of Asterasia.
          </p>
        </div>

        <Dialog>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
            <GalleryImage
              key={homePageGalleryImages[0].id}
              img={homePageGalleryImages[0]}
              index={0}
              onImageClick={setSelectedImage}
              className="md:col-span-2 md:row-span-2"
            />
            <GalleryImage
              key={homePageGalleryImages[1].id}
              img={homePageGalleryImages[1]}
              index={1}
              onImageClick={setSelectedImage}
            />
            <GalleryImage
              key={homePageGalleryImages[2].id}
              img={homePageGalleryImages[2]}
              index={2}
              onImageClick={setSelectedImage}
            />
             <Link href="/gallery" passHref>
                <div
                  className="group relative overflow-hidden bg-secondary flex flex-col items-center justify-center p-8 text-center h-full cursor-pointer transition-colors duration-300 hover:bg-secondary/80 col-span-2"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 50% 50% 50% 50%',
                  }}
                >
                  <h3 className="text-2xl font-bold text-secondary-foreground">Explore Our Gallery</h3>
                  <p className="mt-2 text-secondary-foreground/80">See more moments from our café.</p>
                  <div className="mt-4 inline-flex items-center justify-center rounded-full bg-primary/20 text-primary-foreground px-4 py-2 text-sm font-medium">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
          </div>

          <DialogContent className="max-w-4xl w-auto bg-transparent border-0 shadow-none">
            {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Enlarged gallery view"
                  width={1200}
                  height={800}
                  className="object-contain max-h-[90vh] w-full h-auto rounded-lg"
                  sizes="90vw"
                />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
