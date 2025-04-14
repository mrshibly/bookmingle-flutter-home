
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Heart, UserCircle, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-xl h-16 px-5">
      <div className="flex h-full justify-around items-center">
        <NavButton 
          icon={<Home className="w-6 h-6" />} 
          label="Home" 
          isActive={isActive('/home')} 
          onClick={() => navigate('/home')}
        />
        <NavButton 
          icon={<BookOpen className="w-6 h-6" />} 
          label="Library" 
          isActive={isActive('/library')} 
          onClick={() => navigate('/library')}
        />
        <NavButton 
          icon={<Plus className="w-6 h-6" />} 
          label="Post" 
          isActive={isActive('/create-post')} 
          onClick={() => navigate('/create-post')}
        />
        <NavButton 
          icon={<Heart className="w-6 h-6" />} 
          label="Wishlist" 
          isActive={isActive('/wishlist')} 
          onClick={() => navigate('/wishlist')}
        />
        <NavButton 
          icon={<UserCircle className="w-6 h-6" />} 
          label="Profile" 
          isActive={isActive('/profile')} 
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ 
  icon, 
  label, 
  isActive = false,
  onClick
}) => {
  return (
    <motion.button 
      className="flex flex-col items-center" 
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`${isActive ? 'text-bookMingle-primary' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-bookMingle-primary font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
      {isActive && (
        <motion.div 
          className="absolute bottom-1 w-5 h-1 bg-bookMingle-primary rounded-full"
          layoutId="activeTab"
          transition={{ type: "spring", duration: 0.5 }}
        />
      )}
    </motion.button>
  );
};

export default NavBar;
