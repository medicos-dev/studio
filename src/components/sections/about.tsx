
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const aboutImages = PlaceHolderImages.filter(img => img.id.startsWith('about-'));

const AboutSection = () => {
  const image1 = aboutImages.find(img => img.id === 'about-1');
  const image2 = aboutImages.find(img => img.id === 'about-2');

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            {/* Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/50 rounded-full filter blur-2xl animate-blob"></div>
            <div className="absolute bottom-0 -right-10 w-48 h-48 bg-accent/30 rounded-full filter blur-2xl animate-blob animation-delay-2000"></div>

            {image1 && (
               <div className="relative w-[65%] h-[65%] z-10 shadow-2xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'}}>
                  <Image
                    src={image1.imageUrl}
                    alt={image1.description}
                    fill
                    data-ai-hint={image1.imageHint}
                    className="object-cover w-full h-full rounded-[inherit]"
                  />
               </div>
            )}
            {image2 && (
              <div className="absolute bottom-0 -left-4 w-[30%] h-[30%] z-20 shadow-2xl" style={{ borderRadius: '60% 40% 30% 70% / 70% 60% 40% 30%' }}>
                 <Image
                    src={image2.imageUrl}
                    alt={image2.description}
                    fill
                    data-ai-hint={image2.imageHint}
                    className="object-cover w-full h-full rounded-[inherit]"
                 />
              </div>
            )}
            {/* Pebble decorative element */}
            <div className="absolute -bottom-8 right-0 w-24 h-16 bg-muted rounded-full transform -rotate-12"></div>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              Where Coffee
              <br />
              Becomes Art.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              Asterasia is more than a café; it's a sanctuary for the senses. Born from a passion for exceptional coffee and artistic expression, we've crafted a space where every detail is a brushstroke in a larger masterpiece.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto md:mx-0">
              Our philosophy is simple: source the finest beans, prepare them with reverence, and serve them in an atmosphere that inspires creativity and connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
