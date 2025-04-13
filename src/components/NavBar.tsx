
import React from 'react';
import { Home, BookOpen, Search, User } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] rounded-t-xl h-16 px-5">
      <div className="flex h-full justify-around items-center">
        <NavButton icon={<Home className="w-6 h-6" />} label="Home" isActive={true} />
        <NavButton icon={<BookOpen className="w-6 h-6" />} label="Library" />
        <NavButton icon={<Search className="w-6 h-6" />} label="Search" />
        <NavButton icon={<User className="w-6 h-6" />} label="Profile" />
      </div>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, isActive = false }) => {
  return (
    <button className="flex flex-col items-center">
      <div className={`${isActive ? 'text-bookMingle-primary' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span className={`text-xs mt-1 ${isActive ? 'text-bookMingle-primary font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
    </button>
  );
};

export default NavBar;
