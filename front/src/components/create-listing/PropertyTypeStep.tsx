import { Home, Building2, Castle, Warehouse, Hotel, Trees } from 'lucide-react';
import { TypeLogement } from '../../types';

interface PropertyTypeStepProps {
  selectedType: TypeLogement | null;
  onSelect: (type: TypeLogement) => void;
}

const propertyTypes = [
  { type: 'VILLA' as TypeLogement, label: 'Villa', icon: Home, description: 'Propriété indépendante' },
  { type: 'APPARTEMENT' as TypeLogement, label: 'Appartement', icon: Building2, description: 'Dans un immeuble' },
  { type: 'CHATEAU' as TypeLogement, label: 'Château', icon: Castle, description: 'Demeure historique' },
  { type: 'CABANE' as TypeLogement, label: 'Cabane', icon: Trees, description: 'Dans les arbres ou nature' },
  { type: 'CHAMBRE' as TypeLogement, label: 'Chambre', icon: Hotel, description: 'Espace privé partagé' },
  { type: 'YOURTE' as TypeLogement, label: 'Yourte', icon: Warehouse, description: 'Hébergement atypique' },
];

export function PropertyTypeStep({ selectedType, onSelect }: PropertyTypeStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1>Quel type de logement proposez-vous ?</h1>
        <p className="text-[#717171] text-lg">
          Choisissez la catégorie qui décrit le mieux votre bien
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {propertyTypes.map(({ type, label, icon: Icon, description }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all hover:shadow-md ${
              selectedType === type
                ? 'border-[#FF5A5F] bg-[#FF5A5F]/5'
                : 'border-[#DDDDDD] hover:border-[#222222]'
            }`}
          >
            <div className={`mb-4 p-4 rounded-full transition-colors ${
              selectedType === type
                ? 'bg-[#FF5A5F]/10'
                : 'bg-[#F7F7F7] group-hover:bg-[#ECECEC]'
            }`}>
              <Icon className={`w-8 h-8 transition-colors ${
                selectedType === type ? 'text-[#FF5A5F]' : 'text-[#222222]'
              }`} />
            </div>
            <p className={`font-medium mb-1 transition-colors ${
              selectedType === type ? 'text-[#FF5A5F]' : 'text-[#222222]'
            }`}>
              {label}
            </p>
            <p className="text-sm text-[#717171] text-center">
              {description}
            </p>
            
            {selectedType === type && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-[#FF5A5F] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
