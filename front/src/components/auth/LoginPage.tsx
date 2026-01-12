import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User, Phone } from 'lucide-react';

interface LoginPageProps {
  userType: 'LOCATAIRE' | 'BAILLEUR';
  onLogin: () => void;
  onBack: () => void;
}

export function LoginPage({ userType, onLogin, onBack }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nom: '',
    prenom: '',
    telephone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    onLogin();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF5A5F]/5 via-white to-[#FF5A5F]/5 flex items-center justify-center px-6 py-12">
      <div className="max-w-[480px] w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#717171] hover:text-[#222222] mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#DDDDDD] p-8 shadow-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-[#FF5A5F] mb-2">ETNAir</h1>
            <h2 className="mb-2">
              {isSignUp ? 'Créer un compte' : 'Connexion'}
            </h2>
            <p className="text-[#717171]">
              En tant que {userType === 'LOCATAIRE' ? 'Locataire' : 'Bailleur'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm text-[#222222]">Prénom</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                      <input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => handleChange('prenom', e.target.value)}
                        placeholder="Jean"
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#FF5A5F] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-[#222222]">Nom</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => handleChange('nom', e.target.value)}
                        placeholder="Dupont"
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#FF5A5F] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-[#222222]">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleChange('telephone', e.target.value)}
                      placeholder="+33 6 12 34 56 78"
                      className="w-full pl-12 pr-4 py-3 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#FF5A5F] transition-colors"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="block text-sm text-[#222222]">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="exemple@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#FF5A5F] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-[#222222]">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#DDDDDD] rounded-xl outline-none focus:border-[#FF5A5F] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717171] hover:text-[#222222]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs text-[#717171]">
                  Minimum 8 caractères
                </p>
              )}
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-sm text-[#FF5A5F] hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors mt-6"
            >
              {isSignUp ? 'Créer mon compte' : 'Se connecter'}
            </button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <p className="text-[#717171]">
              {isSignUp ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?'}
              {' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#FF5A5F] hover:underline"
              >
                {isSignUp ? 'Se connecter' : 'S\'inscrire'}
              </button>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-[#717171] mt-6">
          En continuant, vous acceptez les{' '}
          <button className="text-[#222222] hover:underline">Conditions d'utilisation</button>
          {' '}et la{' '}
          <button className="text-[#222222] hover:underline">Politique de confidentialité</button>
          {' '}d'ETNAir
        </p>
      </div>
    </div>
  );
}