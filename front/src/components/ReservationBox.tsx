import { useState } from 'react';
import { Calendar, Users, Star } from 'lucide-react';
import { Annonce } from '../types';

interface ReservationBoxProps {
  annonce: Annonce;
  onCheckout: () => void;
}

export function ReservationBox({ annonce, onCheckout }: ReservationBoxProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  const nights = calculateNights();
  const subtotal = nights * annonce.prix_par_nuit;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  const canBook = checkIn && checkOut && nights > 0 && guests <= annonce.capacite;

  return (
    <div className="border border-[#DDDDDD] rounded-xl p-6 shadow-xl">
      {/* Price & Rating */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[22px]">{annonce.prix_par_nuit} €</span>
          <span className="text-[#717171]"> nuit</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-[#222222]" />
          <span className="text-[#222222]">{annonce.note_moyenne.toFixed(2)}</span>
          <span className="text-[#717171]">({annonce.nombre_avis})</span>
        </div>
      </div>

      {/* Date Pickers */}
      <div className="border border-[#DDDDDD] rounded-xl overflow-hidden mb-4">
        <div className="grid grid-cols-2">
          <div className="p-3 border-r border-[#DDDDDD]">
            <label className="text-xs block mb-1">Arrivée</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full border-none outline-none text-sm"
            />
          </div>
          <div className="p-3">
            <label className="text-xs block mb-1">Départ</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              min={checkIn || new Date().toISOString().split('T')[0]}
              className="w-full border-none outline-none text-sm"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative border-t border-[#DDDDDD]">
          <button
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            className="w-full p-3 text-left"
          >
            <label className="text-xs block mb-1">Voyageurs</label>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4" />
              <span>{guests} {guests > 1 ? 'voyageurs' : 'voyageur'}</span>
            </div>
          </button>

          {showGuestPicker && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#DDDDDD] rounded-xl mt-2 p-4 shadow-lg z-10">
              <div className="flex items-center justify-between">
                <span>Nombre de voyageurs</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={guests <= 1}
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(annonce.capacite, guests + 1))}
                    className="w-8 h-8 rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={guests >= annonce.capacite}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#717171] mt-2">
                Capacité maximale : {annonce.capacite} voyageurs
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reserve Button */}
      <button
        onClick={onCheckout}
        disabled={!canBook}
        className="w-full py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        Réserver
      </button>

      <p className="text-center text-sm text-[#717171] mb-6">
        Vous ne serez pas débité pour le moment
      </p>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between text-[#717171]">
            <span className="underline">{annonce.prix_par_nuit} € × {nights} {nights > 1 ? 'nuits' : 'nuit'}</span>
            <span>{subtotal} €</span>
          </div>
          <div className="flex justify-between text-[#717171]">
            <span className="underline">Frais de service</span>
            <span>{serviceFee} €</span>
          </div>
          <div className="border-t border-[#DDDDDD] pt-3 flex justify-between">
            <span>Total</span>
            <span>{total} €</span>
          </div>
        </div>
      )}
    </div>
  );
}
