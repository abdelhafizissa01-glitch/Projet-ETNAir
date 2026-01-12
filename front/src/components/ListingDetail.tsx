import { useState } from 'react';
import { Star, ChevronLeft, MapPin, Users, Ruler, Shield, Wifi, ChefHat, Car, Waves, Wind, Flame, AlertTriangle, Tv, Trees, Baby, Armchair, WashingMachine } from 'lucide-react';
import { mockAnnonces, mockAvis } from '../data/mockData';
import { ReservationBox } from './ReservationBox';

interface ListingDetailProps {
  listingId: string;
  onCheckout: () => void;
  onBack: () => void;
}

const iconMap: { [key: string]: any } = {
  Wifi, ChefHat, Car, Waves, Wind, Flame, AlertTriangle, Tv, Trees, Baby, Armchair, WashingMachine, Shield
};

export function ListingDetail({ listingId, onCheckout, onBack }: ListingDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const annonce = mockAnnonces.find(a => a.id === listingId);
  const avis = mockAvis[listingId] || [];

  if (!annonce) return <div>Annonce non trouvée</div>;

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#222222] hover:text-[#FF5A5F] mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Retour</span>
      </button>

      {/* Title */}
      <h1 className="mb-4">{annonce.titre}</h1>

      {/* Photo Gallery */}
      <div className="grid grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8 h-[400px]">
        <div 
          className="col-span-2 row-span-2 cursor-pointer"
          onClick={() => setSelectedImage(0)}
        >
          <img
            src={annonce.photos[0].url}
            alt={annonce.titre}
            className="w-full h-full object-cover hover:brightness-95 transition-all"
          />
        </div>
        {annonce.photos.slice(1, 5).map((photo, index) => (
          <div 
            key={photo.id}
            className="cursor-pointer"
            onClick={() => setSelectedImage(index + 1)}
          >
            <img
              src={photo.url}
              alt={`${annonce.titre} ${index + 2}`}
              className="w-full h-full object-cover hover:brightness-95 transition-all"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host Info */}
          <div className="pb-8 border-b border-[#DDDDDD]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="mb-2">
                  {annonce.type.charAt(0) + annonce.type.slice(1).toLowerCase()} à {annonce.etablissement.ville}
                </h2>
                <div className="flex items-center gap-3 text-[#717171]">
                  <span>{annonce.capacite} voyageurs</span>
                  <span>•</span>
                  <span>{annonce.superficie} m²</span>
                </div>
              </div>
              <img
                src={annonce.hote.url_photo}
                alt={`${annonce.hote.prenom} ${annonce.hote.nom}`}
                className="w-14 h-14 rounded-full"
              />
            </div>
            <p className="text-[#717171]">
              Proposé par {annonce.hote.prenom} {annonce.hote.nom}
            </p>
          </div>

          {/* Description */}
          <div className="pb-8 border-b border-[#DDDDDD]">
            <h3 className="mb-4">À propos de ce logement</h3>
            <p className="text-[#717171] leading-relaxed">
              {annonce.description}
            </p>
          </div>

          {/* Services */}
          <div className="pb-8 border-b border-[#DDDDDD]">
            <h3 className="mb-6">Ce que ce lieu propose</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {annonce.services.map((service) => {
                const Icon = iconMap[service.icon] || Wifi;
                return (
                  <div key={service.id} className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-[#222222]" />
                    <span className="text-[#222222]">{service.nom}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="pb-8 border-b border-[#DDDDDD]">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 fill-[#222222]" />
              <h3>{annonce.note_moyenne.toFixed(2)} · {annonce.nombre_avis} avis</h3>
            </div>

            {avis.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {avis.map((avis) => (
                  <div key={avis.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={avis.utilisateur.url_photo}
                        alt={`${avis.utilisateur.prenom} ${avis.utilisateur.nom}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">
                          {avis.utilisateur.prenom} {avis.utilisateur.nom}
                        </p>
                        <p className="text-sm text-[#717171]">
                          {new Date(avis.date_creation).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < avis.note ? 'fill-[#222222]' : 'fill-[#DDDDDD]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[#717171] leading-relaxed">{avis.commentaire}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#717171]">Aucun avis pour le moment</p>
            )}
          </div>

          {/* Location */}
          <div>
            <h3 className="mb-4">Où vous allez</h3>
            <div className="flex items-start gap-2 text-[#717171] mb-4">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <div>
                <p>{annonce.etablissement.adresse}</p>
                <p>{annonce.etablissement.code_postal} {annonce.etablissement.ville}, {annonce.etablissement.pays}</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center">
              <p className="text-[#717171]">Carte interactive</p>
            </div>
          </div>
        </div>

        {/* Reservation Box - Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <ReservationBox annonce={annonce} onCheckout={onCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}
