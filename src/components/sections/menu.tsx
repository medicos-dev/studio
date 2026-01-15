
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';
import Image from 'next/image';

const menuItems = [
  {
    id: 'menu-1',
    name: 'Celestial Latte',
    description: 'A creamy espresso blend with hints of vanilla and cardamom, topped with star-anise dust.',
    category: 'Coffee',
  },
  {
    id: 'menu-2',
    name: 'Nebula Cheesecake',
    description: 'A swirling galaxy of blueberry and lemon on a buttery biscuit base.',
    category: 'Desserts',
  },
  {
    id: 'menu-3',
    name: 'Meteor Bite',
    description: 'Spicy chorizo and manchego cheese encased in a fluffy, golden-baked dough.',
    category: 'Specials',
  },
];

const MenuCard = ({ item }: { item: (typeof menuItems)[0] }) => {
  const placeholder = PlaceHolderImages.find(img => img.id === item.id);

  return (
    <div className="group relative bg-background p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-2xl overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden rounded-lg">
        {placeholder && (
          <Image
            src={placeholder.imageUrl}
            alt={placeholder.description}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            data-ai-hint={placeholder.imageHint}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <Badge variant="secondary" className="absolute bottom-3 right-3 rounded-full">{item.category}</Badge>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold font-headline">{item.name}</h3>
        <p className="mt-2 text-muted-foreground">{item.description}</p>
      </div>
    </div>
  );
};


const MenuSection = () => {
  return (
    <section id="menu" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">Taste the Cosmos</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated selection of our finest creations, designed to delight and inspire.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
