import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { ListingDetail } from './components/ListingDetail';
import { CheckoutPage } from './components/CheckoutPage';
import { Dashboard } from './components/Dashboard';
import { CreateListingFlow } from './components/CreateListingFlow';
import { UserTypeSelection } from './components/auth/UserTypeSelection';
import { LoginPage } from './components/auth/LoginPage';

type Page = 'home' | 'listing' | 'checkout' | 'dashboard' | 'create-listing' | 'user-type-selection' | 'login';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('user-type-selection');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'LOCATAIRE' | 'BAILLEUR'>('LOCATAIRE');
  const [selectedUserType, setSelectedUserType] = useState<'LOCATAIRE' | 'BAILLEUR' | null>(null);

  const handleViewListing = (id: string) => {
    setSelectedListingId(id);
    setCurrentPage('listing');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleSelectUserType = (type: 'LOCATAIRE' | 'BAILLEUR') => {
    setSelectedUserType(type);
    setUserType(type);
    setCurrentPage('login');
  };

  const handleLogin = (type?: 'LOCATAIRE' | 'BAILLEUR') => {
    setIsLoggedIn(true);
    if (type) {
      setUserType(type);
    }
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('user-type-selection');
  };

  const handleCreateListing = () => {
    setCurrentPage('create-listing');
  };

  const handleCreateListingComplete = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentPage !== 'create-listing' && currentPage !== 'user-type-selection' && currentPage !== 'login' && (
        <Header 
          isLoggedIn={isLoggedIn}
          userType={userType}
          onNavigate={setCurrentPage}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
      
      {currentPage === 'user-type-selection' && (
        <UserTypeSelection onSelectType={handleSelectUserType} />
      )}

      {currentPage === 'login' && selectedUserType && (
        <LoginPage 
          userType={selectedUserType}
          onLogin={() => handleLogin()}
          onBack={() => setCurrentPage('user-type-selection')}
        />
      )}
      
      {currentPage === 'home' && (
        <HomePage onViewListing={handleViewListing} />
      )}
      
      {currentPage === 'listing' && selectedListingId && (
        <ListingDetail 
          listingId={selectedListingId} 
          onCheckout={handleCheckout}
          onBack={() => setCurrentPage('home')}
        />
      )}
      
      {currentPage === 'checkout' && selectedListingId && (
        <CheckoutPage 
          listingId={selectedListingId}
          onBack={() => setCurrentPage('listing')}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <Dashboard 
          userType={userType}
          onViewListing={handleViewListing}
          onCreateListing={handleCreateListing}
        />
      )}
      
      {currentPage === 'create-listing' && (
        <CreateListingFlow 
          onClose={() => setCurrentPage('dashboard')}
          onComplete={handleCreateListingComplete}
        />
      )}
    </div>
  );
}