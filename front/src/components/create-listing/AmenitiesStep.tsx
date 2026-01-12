import { 
  Wifi, 
  Car, 
  ChefHat, 
  Tv, 
  WashingMachine, 
  Wind, 
  Waves,
  Briefcase,
  Monitor,
  Printer,
  Shield,
  Flame,
  AlertTriangle,
  Heart,
  Baby,
  Armchair
} from 'lucide-react';

interface AmenitiesStepProps {
  selectedAmenities: string[];
  onToggle: (amenity: string) => void;
}

const amenityCategories = [
  {
    title: 'Général',
    amenities: [
      { id: 'wifi', label: 'Wifi', icon: Wifi },
      { id: 'parking', label: 'Parking gratuit', icon: Car },
      { id: 'cuisine', label: 'Cuisine équipée', icon: ChefHat },
      { id: 'tv', label: 'Télévision', icon: Tv },
      { id: 'lave-linge', label: 'Lave-linge', icon: WashingMachine },
      { id: 'climatisation', label: 'Climatisation', icon: Wind },
    ]
  },
  {
    title: 'Espace de travail',
    amenities: [
      { id: 'bureau', label: 'Bureau dédié', icon: Briefcase },
      { id: 'moniteur', label: 'Moniteur externe', icon: Monitor },
      { id: 'imprimante', label: 'Imprimante', icon: Printer },
    ]
  },
  {
    title: 'Extérieur',
    amenities: [
      { id: 'piscine', label: 'Piscine', icon: Waves },
    ]
  },
  {
    title: 'Sécurité',
    amenities: [
      { id: 'detecteur-fumee', label: 'Détecteur de fumée', icon: AlertTriangle },
      { id: 'extincteur', label: 'Extincteur', icon: Flame },
      { id: 'trousse-secours', label: 'Trousse de secours', icon: Heart },
      { id: 'alarme', label: 'Système d\'alarme', icon: Shield },
    ]
  },
  {
    title: 'Famille',
    amenities: [
      { id: 'lit-bebe', label: 'Lit bébé', icon: Baby },
      { id: 'chaise-haute', label: 'Chaise haute', icon: Armchair },
    ]
  }
];

export function AmenitiesStep({ selectedAmenities, onToggle }: AmenitiesStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1>Qu'offre votre logement ?</h1>
        <p className="text-[#717171] text-lg">
          Sélectionnez tous les équipements et services disponibles
        </p>
      </div>

      <div className="space-y-8">
        {amenityCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-[#222222]">{category.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.amenities.map(({ id, label, icon: Icon }) => {
                const isSelected = selectedAmenities.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => onToggle(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-full border-2 transition-all ${
                      isSelected
                        ? 'border-[#FF5A5F] bg-[#222222] text-white'
                        : 'border-[#DDDDDD] bg-[#F7F7F7] text-[#222222] hover:border-[#222222]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${
                      isSelected ? 'text-white' : 'text-[#222222]'
                    }`} />
                    <span className="text-sm">{label}</span>
                    {isSelected && (
                      <div className="ml-auto w-5 h-5 bg-[#FF5A5F] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedAmenities.length > 0 && (
        <div className="bg-[#F7F7F7] rounded-xl p-4 border border-[#DDDDDD]">
          <p className="text-sm text-[#717171]">
            <span className="text-[#222222] font-medium">{selectedAmenities.length}</span> équipement{selectedAmenities.length > 1 ? 's' : ''} sélectionné{selectedAmenities.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}