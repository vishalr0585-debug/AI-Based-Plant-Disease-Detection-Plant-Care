import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserMenu } from './UserMenu';
import { 
  Leaf, 
  Menu, 
  X, 
  Camera, 
  BookOpen, 
  History, 
  Users 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home', label: 'Detect Disease', icon: Camera },
    { id: 'guide', label: 'Care Guide', icon: BookOpen },
    { id: 'history', label: 'History', icon: History },
    { id: 'community', label: 'Community', icon: Users }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PlantCare AI</h1>
              <p className="text-xs text-gray-500">Disease Detection</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all",
                    currentPage === item.id 
                      ? "bg-green-600 text-white hover:bg-green-700" 
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  )}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            {isAuthenticated && <UserMenu />}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg justify-start transition-all",
                      currentPage === item.id 
                        ? "bg-green-600 text-white" 
                        : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                    )}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}