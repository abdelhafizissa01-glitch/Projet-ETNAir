import { Search, Menu, User, LogOut, Home as HomeIcon, Calendar } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  userType: 'LOCATAIRE' | 'BAILLEUR';
  onNavigate: (page: string) => void;
  onLogin: (type: 'LOCATAIRE' | 'BAILLEUR') => void;
  onLogout: () => void;
}

export function Header({ isLoggedIn, userType, onNavigate, onLogin, onLogout }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DDDDDD]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="bg-[#FF5A5F] p-2 rounded-xl">
              <HomeIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-[#FF5A5F] tracking-tight">ETNAir</span>
          </button>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center gap-3 border border-[#DDDDDD] rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <span className="text-[#222222]">Destination</span>
              <div className="w-px h-6 bg-[#DDDDDD]"></div>
              <span className="text-[#222222]">Dates</span>
              <div className="w-px h-6 bg-[#DDDDDD]"></div>
              <span className="text-[#222222]">Voyageurs</span>
            </div>
            <div className="bg-[#FF5A5F] p-2 rounded-full">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* User Menu */}
          <div className="relative">
            {!isLoggedIn ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-3 border border-[#DDDDDD] rounded-full px-4 py-2 hover:shadow-md transition-shadow"
              >
                <Menu className="w-4 h-4 text-[#222222]" />
                <User className="w-6 h-6 text-[#222222]" />
              </button>
            ) : (
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 border border-[#DDDDDD] rounded-full px-4 py-2 hover:shadow-md transition-shadow"
              >
                <Menu className="w-4 h-4 text-[#222222]" />
                <img 
                  src="https://i.pravatar.cc/150?img=8" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
              </button>
            )}

            {/* User Dropdown Menu */}
            {showUserMenu && isLoggedIn && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#DDDDDD] py-2">
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Mes réservations</span>
                </button>
                {userType === 'BAILLEUR' && (
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setShowUserMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2"
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span>Gérer mes annonces</span>
                  </button>
                )}
                <div className="border-t border-[#DDDDDD] my-2"></div>
                <button
                  onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h2 className="mb-6">Connexion</h2>
            <p className="text-[#717171] mb-6">
              Choisissez votre type de compte pour continuer
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  onLogin('LOCATAIRE');
                  setShowLoginModal(false);
                }}
                className="w-full px-6 py-3 bg-[#FF5A5F] text-white rounded-xl hover:bg-[#FF5A5F]/90 transition-colors"
              >
                Se connecter comme Locataire
              </button>
              <button
                onClick={() => {
                  onLogin('BAILLEUR');
                  setShowLoginModal(false);
                }}
                className="w-full px-6 py-3 border-2 border-[#FF5A5F] text-[#FF5A5F] rounded-xl hover:bg-[#FF5A5F]/5 transition-colors"
              >
                Se connecter comme Bailleur
              </button>
            </div>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 w-full text-[#717171] hover:text-[#222222]"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
