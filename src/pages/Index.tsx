
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;
    
    // Redirect to splash screen which will handle auth logic
    navigate('/');
  }, [navigate, user, isLoading]);

  return (
    <div className="flex items-center justify-center h-screen bg-bookMingle-background">
      <p>Redirecting...</p>
    </div>
  );
};

export default Index;
