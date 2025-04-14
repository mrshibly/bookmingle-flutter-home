
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User, Settings, LogOut, ChevronRight, Heart, BookOpen, Plus, ArrowLeft, Camera } from 'lucide-react';
import NavBar from '@/components/NavBar';
import EditProfileDialog from '@/components/EditProfileDialog';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfilePicture = () => {
    toast({
      title: "Feature coming soon",
      description: "Profile picture upload will be available in the next update."
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* Header */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Profile</h1>
          </div>
          <button className="p-1 rounded-full">
            <Settings className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-20">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 relative">
          <div className="flex items-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-bookMingle-background flex items-center justify-center text-2xl font-bold text-bookMingle-primary">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button 
                className="absolute -right-1 bottom-0 bg-bookMingle-primary rounded-full p-1.5 shadow-md"
                onClick={handleUpdateProfilePicture}
              >
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</h2>
              <p className="text-sm text-gray-500">{user?.email || ''}</p>
              <p className="text-sm text-gray-500">{user?.user_metadata?.country || ''}</p>
              <div className="mt-1 flex items-center">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Book Lover
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-xl font-bold">12</p>
              <p className="text-xs text-gray-500">Books Shared</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">8</p>
              <p className="text-xs text-gray-500">Exchanged</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">4</p>
              <p className="text-xs text-gray-500">Wishlist</p>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <motion.button 
            className="flex items-center justify-between w-full p-4 border-b"
            onClick={() => navigate('/library')}
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-bookMingle-primary" />
              </div>
              <span className="ml-3">My Library</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
          
          <motion.button 
            className="flex items-center justify-between w-full p-4 border-b"
            onClick={() => navigate('/wishlist')}
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="h-4 w-4 text-red-500" />
              </div>
              <span className="ml-3">My Wishlist</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
          
          <motion.button 
            className="flex items-center justify-between w-full p-4"
            onClick={() => navigate('/create-post')}
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Plus className="h-4 w-4 text-green-500" />
              </div>
              <span className="ml-3">Create Post</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
        </div>
        
        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h3 className="font-medium">Account Settings</h3>
          </div>
          
          <motion.button 
            className="flex items-center justify-between w-full p-4 border-b"
            onClick={() => setIsEditProfileOpen(true)}
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <span className="ml-3">Edit Profile</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.button>
          
          <motion.button 
            className="flex items-center justify-between w-full p-4 border-b text-red-500"
            onClick={handleLogout}
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
            disabled={isLoading}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <LogOut className="h-4 w-4 text-red-500" />
              </div>
              <span className="ml-3">
                {isLoading ? 'Logging out...' : 'Logout'}
              </span>
            </div>
            <ChevronRight className="h-5 w-5 text-red-500" />
          </motion.button>
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>BookMingle v1.0.0</p>
          <p className="mt-1">© {new Date().getFullYear()} Book Exchange App</p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
      
      {/* Edit Profile Dialog */}
      <EditProfileDialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen} />
    </div>
  );
};

export default ProfilePage;
