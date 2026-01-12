import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Annonce } from '../types';

interface ListingCardProps {
  annonce: Annonce;
  onClick: () => void;
}

export function ListingCard({ annonce, onClick }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === annonce.photos.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? annonce.photos.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Image Carousel */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
        <img
          src={annonce.photos[currentImageIndex].url}
          alt={annonce.titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-[#FF5A5F] stroke-[#FF5A5F]' : 'stroke-[#222222]'}`}
          />
        </button>

        {/* Navigation Buttons */}
        {annonce.photos.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {annonce.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-[#222222] truncate">
              {annonce.etablissement.ville}, {annonce.etablissement.pays}
            </p>
            <p className="text-[#717171] truncate text-sm">
              {annonce.type.charAt(0) + annonce.type.slice(1).toLowerCase()}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-4 h-4 fill-[#222222]" />
            <span className="text-[#222222]">{annonce.note_moyenne.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-[#222222]">
          <span className="font-semibold">{annonce.prix_par_nuit} €</span> nuit
        </p>
      </div>
    </div>
  );
}
