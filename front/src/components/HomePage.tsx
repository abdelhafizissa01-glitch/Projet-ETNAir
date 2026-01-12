import { useState } from 'react';
import { Home, Building2, Castle, Trees, Tent, Hotel } from 'lucide-react';
import { mockAnnonces } from '../data/mockData';
import { ListingCard } from './ListingCard';
import { TypeLogement } from '../types';

interface HomePageProps {
  onViewListing: (id: string) => void;
}

const categories = [
  { type: 'VILLA' as TypeLogement, label: 'Villas', icon: Home },
  { type: 'APPARTEMENT' as TypeLogement, label: 'Appartements', icon: Building2 },
  { type: 'CHATEAU' as TypeLogement, label: 'Châteaux', icon: Castle },
  { type: 'CABANE' as TypeLogement, label: 'Cabanes', icon: Trees },
  { type: 'YOURTE' as TypeLogement, label: 'Yourtes', icon: Tent },
  { type: 'CHAMBRE' as TypeLogement, label: 'Chambres', icon: Hotel },
];

export function HomePage({ onViewListing }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<TypeLogement | null>(null);

  const filteredAnnonces = selectedCategory
    ? mockAnnonces.filter(annonce => annonce.type === selectedCategory)
    : mockAnnonces;

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
      {/* Category Filter Bar */}
      <div className="sticky top-20 z-40 bg-white py-6 border-b border-[#DDDDDD] -mx-6 lg:-mx-20 px-6 lg:px-20">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar">
          {categories.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              onClick={() => setSelectedCategory(selectedCategory === type ? null : type)}
              className={`flex flex-col items-center gap-2 pb-2 px-2 flex-shrink-0 transition-all ${
                selectedCategory === type
                  ? 'border-b-2 border-[#222222] opacity-100'
                  : 'border-b-2 border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Listings Grid */}
      <div className="py-8">
        {filteredAnnonces.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#717171]">Aucun logement trouvé pour cette catégorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAnnonces.map(annonce => (
              <ListingCard
                key={annonce.id}
                annonce={annonce}
                onClick={() => onViewListing(annonce.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
