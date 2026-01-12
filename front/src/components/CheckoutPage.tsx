import { useState } from 'react';
import { ChevronLeft, CreditCard, Smartphone } from 'lucide-react';
import { mockAnnonces } from '../data/mockData';
import { ModePaiement } from '../types';

interface CheckoutPageProps {
  listingId: string;
  onBack: () => void;
}

const paymentMethods: { type: ModePaiement; label: string; icon: any }[] = [
  { type: 'CARTE_BANCAIRE', label: 'Carte Bancaire', icon: CreditCard },
  { type: 'PAYPAL', label: 'PayPal', icon: CreditCard },
  { type: 'APPLE_PAY', label: 'Apple Pay', icon: Smartphone },
  { type: 'GOOGLE_PAY', label: 'Google Pay', icon: Smartphone },
];

export function CheckoutPage({ listingId, onBack }: CheckoutPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<ModePaiement>('CARTE_BANCAIRE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const annonce = mockAnnonces.find(a => a.id === listingId);
  if (!annonce) return <div>Annonce non trouvée</div>;

  const checkIn = '2024-12-25';
  const checkOut = '2024-12-30';
  const guests = 4;
  const nights = 5;
  const subtotal = nights * annonce.prix_par_nuit;
  const serviceFee = Math.round(subtotal * 0.14);
  const total = subtotal + serviceFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
    }, 2000);
  };

  if (isCompleted) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1>Réservation confirmée !</h1>
          <p className="text-[#717171]">
            Votre réservation pour {annonce.titre} a été confirmée. Vous recevrez un email de confirmation sous peu.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#222222] hover:text-[#FF5A5F] mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Retour</span>
      </button>

      <h1 className="mb-8">Confirmation et paiement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trip Details */}
          <div className="border border-[#DDDDDD] rounded-xl p-6">
            <h2 className="mb-6">Votre voyage</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Dates</p>
                  <p className="text-[#717171]">
                    {new Date(checkIn).toLocaleDateString('fr-FR')} - {new Date(checkOut).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">Voyageurs</p>
                  <p className="text-[#717171]">{guests} {guests > 1 ? 'voyageurs' : 'voyageur'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-[#DDDDDD] rounded-xl p-6">
            <h2 className="mb-6">Mode de paiement</h2>
            <div className="space-y-3">
              {paymentMethods.map(({ type, label, icon: Icon }) => (
                <label
                  key={type}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedPayment === type
                      ? 'border-[#FF5A5F] bg-[#FF5A5F]/5'
                      : 'border-[#DDDDDD] hover:border-[#222222]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={type}
                    checked={selectedPayment === type}
                    onChange={(e) => setSelectedPayment(e.target.value as ModePaiement)}
                    className="w-5 h-5 accent-[#FF5A5F]"
                  />
                  <Icon className="w-6 h-6" />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {selectedPayment === 'CARTE_BANCAIRE' && (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm mb-2">Numéro de carte</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full p-3 border border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">Date d'expiration</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full p-3 border border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full p-3 border border-[#DDDDDD] rounded-xl outline-none focus:border-[#222222] transition-colors"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Terms */}
          <div className="text-sm text-[#717171]">
            <p>
              En sélectionnant le bouton ci-dessous, j'accepte les{' '}
              <a href="#" className="text-[#222222] underline">Règles de la maison</a>,{' '}
              <a href="#" className="text-[#222222] underline">Conditions générales</a> et{' '}
              <a href="#" className="text-[#222222] underline">Politique de remboursement</a>.
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Traitement en cours...' : `Payer et confirmer (${total} €)`}
          </button>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border border-[#DDDDDD] rounded-xl p-6">
            <div className="flex gap-4 pb-6 border-b border-[#DDDDDD] mb-6">
              <img
                src={annonce.photos[0].url}
                alt={annonce.titre}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div>
                <p className="font-medium line-clamp-2">{annonce.titre}</p>
                <p className="text-sm text-[#717171] mt-1">
                  {annonce.etablissement.ville}, {annonce.etablissement.pays}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-medium">Détails du prix</h3>
              <div className="flex justify-between text-[#717171]">
                <span className="underline">{annonce.prix_par_nuit} € × {nights} nuits</span>
                <span>{subtotal} €</span>
              </div>
              <div className="flex justify-between text-[#717171]">
                <span className="underline">Frais de service</span>
                <span>{serviceFee} €</span>
              </div>
            </div>

            <div className="border-t border-[#DDDDDD] pt-4 flex justify-between">
              <span>Total (EUR)</span>
              <span>{total} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
