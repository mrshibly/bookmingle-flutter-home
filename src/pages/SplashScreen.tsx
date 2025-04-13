
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const SplashScreen = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) return;
      if (user) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading]);

  return (
    <div className="max-w-md mx-auto h-screen bg-bookMingle-background flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs z-10">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      {/* Background Blue Circles */}
      <div className="blue-circle w-64 h-64 -left-32 -top-10"></div>
      <div className="blue-circle w-80 h-80 -right-40 -bottom-20"></div>

      {/* Logo and Brand */}
      <div></div> {/* Spacer */}
      <div className="flex flex-col items-center animate-fade-in z-10">
        <div className="flex items-center gap-3 mb-3">
          <Book className="h-16 w-16 text-bookMingle-primary transform -rotate-12" />
          <h1 className="text-4xl font-bold italic text-black">BookMingle</h1>
        </div>
        <p className="text-sm text-bookMingle-textSecondary text-center mt-1">
          GIVE YOUR BOOK A NEW READER AND SAVE THE TREES
        </p>
      </div>

      {/* Footer Text */}
      <div className="text-center text-xs text-gray-500 z-10">
        <p>Not Just Planting Trees</p>
        <p>Exchanging Books Can Save Trees</p>
      </div>
    </div>
  );
};

export default SplashScreen;
