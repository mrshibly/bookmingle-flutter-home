
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { User, ArrowLeft } from 'lucide-react';
import { getPostById, getMockPosts, addToWishlist } from '@/services/postService';
import { Post } from '@/models/Post';
import NavBar from '@/components/NavBar';

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // In development mode, we'll use mock data
        if (process.env.NODE_ENV === 'development') {
          const mockPosts = getMockPosts();
          const mockBook = mockPosts.find(post => post.id === id);
          
          if (mockBook) {
            setBook(mockBook);
          } else {
            toast({
              title: "Book not found",
              description: "The requested book could not be found",
              variant: "destructive"
            });
            navigate('/home');
          }
        } else {
          if (!id) {
            navigate('/home');
            return;
          }
          
          const bookData = await getPostById(id);
          if (bookData) {
            setBook(bookData);
          } else {
            toast({
              title: "Book not found",
              description: "The requested book could not be found",
              variant: "destructive"
            });
            navigate('/home');
          }
        }
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.message || "An unexpected error occurred",
          variant: "destructive"
        });
        navigate('/home');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate, toast]);

  const handleAddToWishlist = async () => {
    if (!user || !book) return;
    
    setIsAddingToWishlist(true);
    
    try {
      await addToWishlist({
        title: book.title,
        author: book.author,
        edition: book.edition,
        category: book.category,
        description: book.description,
        coverUrl: book.coverUrl,
        userId: user.id
      });
      
      toast({
        title: "Added to Wishlist",
        description: `${book.title} has been added to your wishlist`,
      });
      
      navigate('/wishlist');
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to add to wishlist",
        variant: "destructive"
      });
    } finally {
      setIsAddingToWishlist(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background flex items-center justify-center">
        <p>Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background flex items-center justify-center">
        <p>Book not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 pb-20">
      {/* Status Bar */}
      <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-4">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => navigate('/home')}
          className="text-bookMingle-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <button className="flex items-center text-bookMingle-primary text-sm">
          <User className="h-4 w-4 mr-1" />
          <span className="text-xs">contact Owner</span>
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Details about the book</h1>
      
      <div className="space-y-3 mb-4">
        <div className="bg-bookMingle-card bg-opacity-80 p-3 rounded-xl">
          {book.title}
        </div>
        
        <div className="bg-bookMingle-card bg-opacity-80 p-3 rounded-xl">
          {book.author}
        </div>
        
        <div className="bg-bookMingle-card bg-opacity-80 p-3 rounded-xl">
          {book.edition}
        </div>
        
        <div className="bg-bookMingle-card bg-opacity-80 p-3 rounded-xl">
          {book.category}
        </div>
      </div>
      
      {/* Book Cover */}
      <div className="flex justify-center mb-4">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-32 h-auto rounded-lg shadow-md"
        />
      </div>
      
      {/* Description */}
      <div className="bg-bookMingle-card bg-opacity-60 p-4 rounded-xl mb-6 text-sm">
        {book.description}
      </div>
      
      {/* Add to Wishlist Button */}
      <button 
        onClick={handleAddToWishlist}
        className="w-full bg-bookMingle-button text-white py-3 px-4 rounded-full font-medium hover:bg-opacity-90 transition-colors"
        disabled={isAddingToWishlist}
      >
        {isAddingToWishlist ? "Adding..." : "Add into wishlist"}
      </button>
      
      <NavBar />
    </div>
  );
};

export default BookDetailsPage;
