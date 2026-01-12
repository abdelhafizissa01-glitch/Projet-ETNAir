import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface PhotosStepProps {
  photos: File[];
  onUpdate: (photos: File[]) => void;
}

export function PhotosStep({ photos, onUpdate }: PhotosStepProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPhotos = [...photos, ...files];
    onUpdate(newPhotos);

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onUpdate(newPhotos);
    setPreviews(newPreviews);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1>Ajoutez des photos de votre logement</h1>
        <p className="text-[#717171] text-lg">
          Les photos aident les voyageurs à imaginer leur séjour. Ajoutez au moins 5 photos.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-[#DDDDDD] rounded-xl p-12 text-center cursor-pointer hover:border-[#222222] hover:bg-[#F7F7F7] transition-all"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-[#F7F7F7] rounded-full">
            <Upload className="w-8 h-8 text-[#222222]" />
          </div>
          <div>
            <p className="text-lg mb-1">Glissez-déposez vos photos ici</p>
            <p className="text-sm text-[#717171]">ou cliquez pour parcourir</p>
          </div>
          <p className="text-xs text-[#717171]">
            Format acceptés : JPG, PNG (max 10 MB par photo)
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Photo Grid */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3>{previews.length} photo{previews.length > 1 ? 's' : ''} ajoutée{previews.length > 1 ? 's' : ''}</h3>
            {previews.length < 5 && (
              <p className="text-sm text-[#717171]">
                Ajoutez au moins {5 - previews.length} photo{5 - previews.length > 1 ? 's' : ''} de plus
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={preview}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removePhoto(index);
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-[#222222]" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 px-3 py-1 bg-white rounded-full text-xs font-medium">
                    Photo de couverture
                  </div>
                )}
              </div>
            ))}

            {/* Add More Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square border-2 border-dashed border-[#DDDDDD] rounded-xl hover:border-[#222222] hover:bg-[#F7F7F7] transition-all flex flex-col items-center justify-center gap-2"
            >
              <ImageIcon className="w-8 h-8 text-[#717171]" />
              <span className="text-sm text-[#717171]">Ajouter</span>
            </button>
          </div>

          <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-4">
            <p className="text-sm text-[#717171]">
              <strong>Conseil :</strong> La première photo sera utilisée comme image de couverture. 
              Choisissez une photo lumineuse qui met en valeur les meilleurs aspects de votre logement.
            </p>
          </div>
        </div>
      )}

      {previews.length === 0 && (
        <div className="bg-[#F7F7F7] border border-[#DDDDDD] rounded-xl p-6 text-center">
          <ImageIcon className="w-12 h-12 text-[#DDDDDD] mx-auto mb-3" />
          <p className="text-[#717171]">
            Aucune photo ajoutée pour le moment
          </p>
        </div>
      )}
    </div>
  );
}
