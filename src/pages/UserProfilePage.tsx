
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, MessageCircle, Flag, Share, BookOpen } from 'lucide-react';
import NavBar from '@/components/NavBar';
import MessageDialog from '@/components/MessageDialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  
  // For demo purposes, we'll just use mock data
  // In a real app, you would fetch the user profile from the database
  const userProfile = {
    id: userId || '',
    fullName: 'Book Lover',
    email: 'user@example.com',
    country: 'Bangladesh',
    booksShared: 15,
    booksExchanged: 8,
    wishlistItems: 6
  };

  const handleShare = () => {
    // In a real app, this would copy a link to the user's clipboard
    navigator.clipboard.writeText(`${window.location.origin}/user/${userId}`);
    toast({
      title: "Link copied",
      description: "Profile link copied to clipboard"
    });
  };

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "We've received your report and will review it."
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
            <h1 className="text-xl font-bold text-white">User Profile</h1>
          </div>
          <div className="flex space-x-2">
            <button onClick={handleReport} className="p-1 rounded-full">
              <Flag className="h-5 w-5 text-white" />
            </button>
            <button onClick={handleShare} className="p-1 rounded-full">
              <Share className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-20">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-bookMingle-background flex items-center justify-center text-2xl font-bold text-bookMingle-primary">
              {userProfile.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">{userProfile.fullName}</h2>
              <p className="text-sm text-gray-500">{userProfile.email}</p>
              <p className="text-sm text-gray-500">{userProfile.country}</p>
              <div className="mt-1 flex items-center">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Book Enthusiast
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-xl font-bold">{userProfile.booksShared}</p>
              <p className="text-xs text-gray-500">Books Shared</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{userProfile.booksExchanged}</p>
              <p className="text-xs text-gray-500">Exchanged</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold">{userProfile.wishlistItems}</p>
              <p className="text-xs text-gray-500">Wishlist</p>
            </div>
          </div>

          <Button
            onClick={() => setIsMessageDialogOpen(true)}
            className="w-full mt-4 bg-bookMingle-primary text-white flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            Send Message
          </Button>
        </div>
        
        {/* Books Shared Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Books Shared</h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-bookMingle-primary"
              onClick={() => navigate(`/user/${userId}/books`)}
            >
              View All
            </Button>
          </div>
          
          <div className="p-4">
            <div className="text-center py-6 text-gray-500">
              <BookOpen className="h-10 w-10 mx-auto text-gray-300 mb-2" />
              <p>Books shared by this user will appear here</p>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
      
      {/* Message Dialog */}
      <MessageDialog
        open={isMessageDialogOpen}
        onOpenChange={setIsMessageDialogOpen}
        recipientName={userProfile.fullName}
        recipientId={userProfile.id}
      />
    </div>
  );
};

export default UserProfilePage;
