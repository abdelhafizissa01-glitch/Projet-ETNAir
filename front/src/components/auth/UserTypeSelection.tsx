import { User, Home } from 'lucide-react';

interface UserTypeSelectionProps {
  onSelectType: (type: 'LOCATAIRE' | 'BAILLEUR') => void;
}

export function UserTypeSelection({ onSelectType }: UserTypeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#FF5A5F]/5 flex items-center justify-center px-6">
      <div className="max-w-[900px] w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-[#FF5A5F] mb-4">ETNAir</h1>
          <h2 className="mb-3">Bienvenue sur ETNAir</h2>
          <p className="text-[#717171] text-lg">
            Commencez par nous dire qui vous êtes
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Locataire Card */}
          <button
            onClick={() => onSelectType('LOCATAIRE')}
            className="group relative bg-white rounded-2xl p-8 border-2 border-[#DDDDDD] hover:border-[#FF5A5F] hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#F7F7F7] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF5A5F]/10 transition-colors">
                <User className="w-10 h-10 text-[#222222] group-hover:text-[#FF5A5F] transition-colors" />
              </div>
              
              <h3 className="mb-3 group-hover:text-[#FF5A5F] transition-colors">
                Je suis Locataire
              </h3>
              
              <p className="text-[#717171] mb-6">
                Trouvez et réservez des logements uniques pour vos voyages
              </p>

              <ul className="text-left space-y-3 text-[#717171] w-full">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Réserver des logements</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gérer vos réservations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Laisser des avis</span>
                </li>
              </ul>

              <div className="mt-8 px-6 py-3 bg-[#FF5A5F] text-white rounded-xl group-hover:bg-[#FF5A5F]/90 transition-colors w-full">
                Continuer comme locataire
              </div>
            </div>
          </button>

          {/* Bailleur Card */}
          <button
            onClick={() => onSelectType('BAILLEUR')}
            className="group relative bg-white rounded-2xl p-8 border-2 border-[#DDDDDD] hover:border-[#FF5A5F] hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#F7F7F7] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FF5A5F]/10 transition-colors">
                <Home className="w-10 h-10 text-[#222222] group-hover:text-[#FF5A5F] transition-colors" />
              </div>
              
              <h3 className="mb-3 group-hover:text-[#FF5A5F] transition-colors">
                Je suis Bailleur
              </h3>
              
              <p className="text-[#717171] mb-6">
                Louez votre logement et générez des revenus supplémentaires
              </p>

              <ul className="text-left space-y-3 text-[#717171] w-full">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Créer vos annonces</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Gérer les réservations</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Suivre vos revenus</span>
                </li>
              </ul>

              <div className="mt-8 px-6 py-3 bg-[#FF5A5F] text-white rounded-xl group-hover:bg-[#FF5A5F]/90 transition-colors w-full">
                Continuer comme bailleur
              </div>
            </div>
          </button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-[#717171] mt-8">
          Vous pourrez toujours changer de rôle plus tard dans vos paramètres
        </p>
      </div>
    </div>
  );
}
