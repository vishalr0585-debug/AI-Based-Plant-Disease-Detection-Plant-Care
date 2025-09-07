import { useState } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/components/auth/AuthPage';
import { LoadingSpinner } from '@/components/layout/LoadingSpinner';
import { Header } from '@/components/layout/Header';
import { HomePage } from '@/components/pages/HomePage';
import { CareGuide } from '@/components/pages/CareGuide';
import { History } from '@/components/pages/History';
import { Community } from '@/components/pages/Community';
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'guide':
        return <CareGuide />;
      case 'history':
        return <History />;
      case 'community':
        return <Community />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;