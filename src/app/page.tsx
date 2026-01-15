
import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import MenuSection from '@/components/sections/menu';
import GallerySection from '@/components/sections/gallery';
import BookingSection from '@/components/sections/booking';

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <BookingSection />
    </div>
  );
}
