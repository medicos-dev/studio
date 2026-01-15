
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));

const GalleryImage = ({
  img,
  index,
  onImageClick,
}: {
  img: (typeof galleryImages)[0];
  index: number;
  onImageClick: (url: string) => void;
}) => {
  return (
    <DialogTrigger asChild onClick={() => onImageClick(img.imageUrl)}>
      <div
        className={cn(
          'group relative overflow-hidden bg-muted cursor-pointer rounded-2xl',
          {
            'md:col-span-2 md:row-span-2': index % 6 === 0,
            'md:col-span-1 md:row-span-1': [1, 2, 4, 5].includes(index % 6),
            'md:col-span-2 md:row-span-1': index % 6 === 3,
          },
          'transform transition-transform duration-500 ease-in-out hover:scale-105'
        )}
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

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-12">
          <Button asChild variant="ghost" size="icon" className="mr-4">
            <Link href="/#gallery">
              <ArrowLeft />
            </Link>
          </Button>
          <div className='text-left'>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">Our Gallery</h1>
            <p className="mt-2 text-lg text-muted-foreground">The moments that define us.</p>
          </div>
        </div>

        <Dialog>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
            {galleryImages.map((img, index) => (
              <GalleryImage
                key={img.id}
                img={img}
                index={index}
                onImageClick={setSelectedImage}
              />
            ))}
          </div>

          <DialogContent className="max-w-5xl w-auto bg-transparent border-0 shadow-none">
            <VisuallyHidden>
              <DialogTitle>Gallery Image</DialogTitle>
            </VisuallyHidden>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Enlarged gallery view"
                width={1600}
                height={1200}
                className="object-contain max-h-[90vh] w-full h-auto rounded-lg"
                sizes="90vw"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
