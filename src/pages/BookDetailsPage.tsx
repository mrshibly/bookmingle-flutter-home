
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { getPostById } from '@/services/postService';
import { ArrowLeft, Heart, MessageCircle, Share, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import NavBar from '@/components/NavBar';
import { format } from 'date-fns';
import MessageDialog from '@/components/MessageDialog';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => getPostById(id || ''),
  });

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: "The book has been added to your wishlist"
    });
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`${window.location.origin}/book/${id}`);
    toast({
      title: "Link copied",
      description: "Book link copied to clipboard"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bookMingle-background flex items-center justify-center">
        <div className="animate-pulse text-bookMingle-primary">Loading...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-bookMingle-background flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
        <p className="text-gray-600">Could not load book details</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const isMyBook = user?.id === book.ownerId;
  const formattedDate = book.createdAt ? format(new Date(book.createdAt), 'MMMM dd, yyyy') : 'Unknown date';

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* Header */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">Book Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            {!isMyBook && (
              <button 
                onClick={handleAddToWishlist}
                className="p-1.5 rounded-full bg-white/20"
              >
                <Heart className="h-5 w-5 text-white" />
              </button>
            )}
            <button 
              onClick={handleShare}
              className="p-1.5 rounded-full bg-white/20"
            >
              <Share className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-full sm:w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                <img 
                  src={book.coverUrl || '/placeholder.svg'} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
                
                <div className="flex items-center mt-2 mb-4">
                  <span className="bg-bookMingle-primary/10 text-bookMingle-primary px-3 py-1 text-sm rounded-full">
                    {book.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">{book.edition}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted on {formattedDate}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600 text-sm">{book.description}</p>
                </div>
                
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/user/${book.ownerId}`)}
                  >
                    <User size={16} />
                    View Owner Profile
                  </Button>
                  
                  {!isMyBook && (
                    <Button 
                      className="mt-3 w-full bg-bookMingle-primary text-white flex items-center justify-center gap-2"
                      onClick={() => setIsMessageDialogOpen(true)}
                    >
                      <MessageCircle size={18} />
                      Contact Owner
                    </Button>
                  )}
                </div>
              </div>
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
        recipientName="Book Owner"
        recipientId={book.ownerId}
      />
    </div>
  );
};

export default BookDetailsPage;
