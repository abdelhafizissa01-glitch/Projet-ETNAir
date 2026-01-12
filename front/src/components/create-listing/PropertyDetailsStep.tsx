import { useState } from 'react';
import { Users, Ruler, MapPin, Home } from 'lucide-react';

interface PropertyDetailsStepProps {
  details: any;
  onUpdate: (details: any) => void;
}

export function PropertyDetailsStep({ details, onUpdate }: PropertyDetailsStepProps) {
  const [formData, setFormData] = useState({
    titre: details.titre || '',
    description: details.description || '',
    capacite: details.capacite || 2,
    superficie: details.superficie || 50,
    prix_par_nuit: details.prix_par_nuit || 100,
    adresse: details.adresse || '',
    ville: details.ville || '',
    pays: details.pays || 'France',
    code_postal: details.code_postal || '',
  });

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1>Parlez-nous de votre logement</h1>
        <p className="text-[#717171] text-lg">
          Ces informations aideront les voyageurs à trouver votre annonce
        </p>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="block">Titre de l'annonce</label>
          <input
            type="text"
            value={formData.titre}
            onChange={(e) => handleChange('titre', e.target.value)}
            placeholder="ex: Villa moderne avec vue sur mer"
            className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Décrivez votre logement, ses points forts et son environnement..."
            rows={5}
            className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors resize-none"
          />
          <p className="text-sm text-[#717171]">
            {formData.description.length} caractères
          </p>
        </div>

        {/* Capacity & Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#717171]" />
              Capacité (voyageurs)
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleChange('capacite', Math.max(1, formData.capacite - 1))}
                className="w-10 h-10 border-2 border-[#DDDDDD] rounded-full hover:border-[#222222] transition-colors"
              >
                −
              </button>
              <span className="w-12 text-center text-xl">{formData.capacite}</span>
              <button
                onClick={() => handleChange('capacite', formData.capacite + 1)}
                className="w-10 h-10 border-2 border-[#DDDDDD] rounded-full hover:border-[#222222] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#717171]" />
              Superficie (m²)
            </label>
            <input
              type="number"
              value={formData.superficie}
              onChange={(e) => handleChange('superficie', parseInt(e.target.value) || 0)}
              className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
            />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="block">Prix par nuit (€)</label>
          <div className="relative">
            <input
              type="number"
              value={formData.prix_par_nuit}
              onChange={(e) => handleChange('prix_par_nuit', parseInt(e.target.value) || 0)}
              className="w-full p-4 pr-12 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717171]">€</span>
          </div>
          <p className="text-sm text-[#717171]">
            Les voyageurs paieront {Math.round(formData.prix_par_nuit * 1.14)} € au total (frais de service inclus)
          </p>
        </div>

        {/* Location */}
        <div className="space-y-4 pt-4 border-t border-[#DDDDDD]">
          <h3 className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#717171]" />
            Localisation
          </h3>

          <div className="space-y-2">
            <label className="block text-sm">Adresse</label>
            <input
              type="text"
              value={formData.adresse}
              onChange={(e) => handleChange('adresse', e.target.value)}
              placeholder="15 Rue de la Plage"
              className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm">Code postal</label>
              <input
                type="text"
                value={formData.code_postal}
                onChange={(e) => handleChange('code_postal', e.target.value)}
                placeholder="75001"
                className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Ville</label>
              <input
                type="text"
                value={formData.ville}
                onChange={(e) => handleChange('ville', e.target.value)}
                placeholder="Paris"
                className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">Pays</label>
            <input
              type="text"
              value={formData.pays}
              onChange={(e) => handleChange('pays', e.target.value)}
              placeholder="France"
              className="w-full p-4 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
