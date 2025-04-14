
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
      {/* Background Blue Circles */}
      <motion.div 
        className="absolute w-64 h-64 -left-32 -top-10 bg-bookMingle-primary rounded-full opacity-80"
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 0.8, transition: { duration: 1.5, repeat: Infinity, repeatType: "reverse" } }}
      />
      <motion.div 
        className="absolute w-80 h-80 -right-40 -bottom-20 bg-bookMingle-primary rounded-full opacity-80"
        initial={{ scale: 0.9, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 0.8, transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 } }}
      />

      {/* Logo and Brand */}
      <div></div> {/* Spacer */}
      <motion.div 
        className="flex flex-col items-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.img 
            src="/lovable-uploads/9b8898c9-ae55-4c42-90d9-ea5857cd67a0.png" 
            alt="BookMingle Logo" 
            className="h-16 w-auto"
            initial={{ rotate: -12 }}
            animate={{ rotate: [0, -12, 0], transition: { duration: 2, repeat: Infinity, repeatType: "reverse" } }}
          />
          <motion.h1 
            className="text-4xl font-bold italic text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.6 } }}
          >
            BookMingle
          </motion.h1>
        </div>
        <motion.p 
          className="text-sm text-bookMingle-textSecondary text-center mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.9 } }}
        >
          GIVE YOUR BOOK A NEW READER AND SAVE THE TREES
        </motion.p>
      </motion.div>

      {/* Footer Text */}
      <motion.div 
        className="text-center text-xs text-gray-500 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8, delay: 1.2 } }}
      >
        <p>Not Just Planting Trees</p>
        <p>Exchanging Books Can Save Trees</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
