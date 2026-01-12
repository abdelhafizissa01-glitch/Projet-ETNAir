import { Calendar, MapPin, Users, Plus } from 'lucide-react';
import { mockReservations } from '../data/mockData';
import { EtatReservation } from '../types';

interface DashboardProps {
  userType: 'LOCATAIRE' | 'BAILLEUR';
  onViewListing: (id: string) => void;
  onCreateListing: () => void;
}

const statusConfig: {
  [key in EtatReservation]: { label: string; color: string; bgColor: string };
} = {
  DEMANDE: { label: 'En attente', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  ACCEPTE: { label: 'Confirmé', color: 'text-green-700', bgColor: 'bg-green-100' },
  REFUSE: { label: 'Refusé', color: 'text-red-700', bgColor: 'bg-red-100' },
  ANNULE: { label: 'Annulé', color: 'text-red-700', bgColor: 'bg-red-100' },
  TERMINE: { label: 'Terminé', color: 'text-gray-700', bgColor: 'bg-gray-100' },
};

export function Dashboard({ userType, onViewListing, onCreateListing }: DashboardProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="mb-2">
            {userType === 'LOCATAIRE' ? 'Mes réservations' : 'Mes annonces'}
          </h1>
          <p className="text-[#717171]">
            {userType === 'LOCATAIRE'
              ? 'Gérez vos voyages et consultez les détails de vos réservations'
              : 'Gérez vos propriétés et les réservations de vos voyageurs'}
          </p>
        </div>
        {userType === 'BAILLEUR' && (
          <button 
            onClick={onCreateListing}
            className="flex items-center gap-2 px-6 py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Créer une annonce</span>
          </button>
        )}
      </div>

      {/* Reservations List */}
      <div className="space-y-6">
        {mockReservations.map((reservation) => {
          const status = statusConfig[reservation.etat];
          const checkInDate = new Date(reservation.date_debut);
          const checkOutDate = new Date(reservation.date_fin);
          const nights = Math.ceil(
            (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
          );

          return (
            <div
              key={reservation.id}
              className="border border-[#DDDDDD] rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Image */}
                <div
                  className="w-full lg:w-64 h-48 rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => onViewListing(reservation.annonce.id)}
                >
                  <img
                    src={reservation.annonce.photos[0].url}
                    alt={reservation.annonce.titre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2
                        className="mb-2 cursor-pointer hover:text-[#FF5A5F] transition-colors"
                        onClick={() => onViewListing(reservation.annonce.id)}
                      >
                        {reservation.annonce.titre}
                      </h2>
                      <div className="flex items-center gap-2 text-[#717171]">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {reservation.annonce.etablissement.ville},{' '}
                          {reservation.annonce.etablissement.pays}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm ${status.bgColor} ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#717171]" />
                      <div>
                        <p className="text-sm text-[#717171]">Arrivée</p>
                        <p>
                          {checkInDate.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#717171]" />
                      <div>
                        <p className="text-sm text-[#717171]">Départ</p>
                        <p>
                          {checkOutDate.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#717171]" />
                      <div>
                        <p className="text-sm text-[#717171]">Voyageurs</p>
                        <p>{reservation.nombre_voyageurs}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#DDDDDD]">
                    <div>
                      <p className="text-[#717171] text-sm">Total pour {nights} nuits</p>
                      <p className="text-xl">{reservation.prix_total} €</p>
                    </div>

                    {userType === 'BAILLEUR' && reservation.etat === 'DEMANDE' && (
                      <div className="flex gap-3">
                        <button className="px-6 py-2 border-2 border-[#222222] text-[#222222] rounded-xl hover:bg-[#222222] hover:text-white transition-colors">
                          Refuser
                        </button>
                        <button className="px-6 py-2 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors">
                          Accepter
                        </button>
                      </div>
                    )}

                    {userType === 'LOCATAIRE' && reservation.etat === 'ACCEPTE' && (
                      <button className="px-6 py-2 border-2 border-[#FF5A5F] text-[#FF5A5F] rounded-xl hover:bg-[#FF5A5F]/5 transition-colors">
                        Voir les détails
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {mockReservations.length === 0 && (
        <div className="text-center py-16 border border-[#DDDDDD] rounded-xl">
          <Calendar className="w-16 h-16 text-[#DDDDDD] mx-auto mb-4" />
          <h3 className="mb-2">Aucune réservation</h3>
          <p className="text-[#717171] mb-6">
            {userType === 'LOCATAIRE'
              ? 'Vous n\'avez pas encore de réservation. Commencez à explorer !'
              : 'Vous n\'avez pas encore reçu de réservations.'}
          </p>
          {userType === 'LOCATAIRE' && (
            <button className="px-8 py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors">
              Découvrir les logements
            </button>
          )}
        </div>
      )}
    </div>
  );
}