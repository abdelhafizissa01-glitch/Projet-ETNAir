import { useState } from 'react';
import { X } from 'lucide-react';
import { PropertyTypeStep } from './create-listing/PropertyTypeStep';
import { AmenitiesStep } from './create-listing/AmenitiesStep';
import { PropertyDetailsStep } from './create-listing/PropertyDetailsStep';
import { PhotosStep } from './create-listing/PhotosStep';
import { TypeLogement } from '../types';

interface CreateListingFlowProps {
  onClose: () => void;
  onComplete: () => void;
}

export function CreateListingFlow({ onClose, onComplete }: CreateListingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: null as TypeLogement | null,
    amenities: [] as string[],
    details: {},
    photos: [] as File[]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== null;
      case 2:
        return formData.amenities.length > 0;
      case 3:
        return true; // Details step validation
      case 4:
        return formData.photos.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      {/* Header with Progress Bar */}
      <div className="sticky top-0 bg-white border-b border-[#DDDDDD] z-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-sm text-[#717171]">
              Étape {currentStep} sur {totalSteps}
            </span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-[#F7F7F7]">
          <div
            className="h-full bg-[#FF5A5F] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[640px] mx-auto px-6 py-12">
        {currentStep === 1 && (
          <PropertyTypeStep
            selectedType={formData.type}
            onSelect={(type) => updateFormData('type', type)}
          />
        )}
        {currentStep === 2 && (
          <AmenitiesStep
            selectedAmenities={formData.amenities}
            onToggle={(amenity) => {
              const newAmenities = formData.amenities.includes(amenity)
                ? formData.amenities.filter(a => a !== amenity)
                : [...formData.amenities, amenity];
              updateFormData('amenities', newAmenities);
            }}
          />
        )}
        {currentStep === 3 && (
          <PropertyDetailsStep
            details={formData.details}
            onUpdate={(details) => updateFormData('details', details)}
          />
        )}
        {currentStep === 4 && (
          <PhotosStep
            photos={formData.photos}
            onUpdate={(photos) => updateFormData('photos', photos)}
          />
        )}
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DDDDDD] py-4 px-6">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 text-[#222222] hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            Retour
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="px-8 py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? 'Publier' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}
