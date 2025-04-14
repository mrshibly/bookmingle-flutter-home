
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Plus, ShieldCheck, Trash2, Info, ArrowLeft, ImagePlus } from 'lucide-react';
import { getWishlistItems, removeFromWishlist } from '@/services/postService';
import { WishlistItem } from '@/models/WishlistItem';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NavBar from '@/components/NavBar';
import { motion, AnimatePresence } from 'framer-motion';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    author: '',
    edition: '',
    category: '',
    description: ''
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchWishlist = async () => {
    try {
      if (!user) return;
      
      setIsLoading(true);
      
      // In development mode, we'll use mock data
      if (process.env.NODE_ENV === 'development') {
        // Import mock data dynamically to avoid circular dependencies
        import('@/services/mockDataService').then(({ getMockWishlistItems }) => {
          setWishlistItems(getMockWishlistItems());
        });
      } else {
        const items = await getWishlistItems(user.id);
        setWishlistItems(items);
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to fetch wishlist items",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // In a real app, we would send this to the backend
    // For now, just show a success message and reset the form
    toast({
      title: "Wishlist Updated",
      description: "Your item has been added to your wishlist",
    });
    
    setIsCreatingNew(false);
    setNewItem({
      title: '',
      author: '',
      edition: '',
      category: '',
      description: ''
    });
    
    // Refresh the wishlist
    fetchWishlist();
  };

  const handleDeleteItem = async (id: string) => {
    if (!user) return;
    
    try {
      setIsDeletingItem(id);
      
      // In development mode, we'll simulate deletion
      if (process.env.NODE_ENV === 'development') {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove item from state
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        
        toast({
          title: "Item Removed",
          description: "The item has been removed from your wishlist",
        });
      } else {
        await removeFromWishlist(id);
        
        // Remove item from state
        setWishlistItems(prev => prev.filter(item => item.id !== id));
        
        toast({
          title: "Item Removed",
          description: "The item has been removed from your wishlist",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to remove item",
        variant: "destructive"
      });
    } finally {
      setIsDeletingItem(null);
    }
  };

  // Pull to refresh functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null || isRefreshing) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    
    // If user has pulled down at least 60px from the top of the screen
    if (diff > 60 && window.scrollY === 0) {
      setIsRefreshing(true);
      refreshWishlist();
    }
  };

  const refreshWishlist = async () => {
    try {
      await fetchWishlist();
      toast({
        title: "Refreshed",
        description: "Your wishlist has been updated",
      });
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
        setStartY(null);
      }, 1000); // Delay to show the refresh animation
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 pb-20">
        {/* Status Bar */}
        <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-6">
          <span>9:41</span>
          <div className="flex items-center space-x-2">
            <span>📶</span>
            <span>🔋 100%</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        
        {/* Skeleton loading */}
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div 
              key={i}
              className="bg-bookMingle-card bg-opacity-30 p-4 rounded-xl flex items-center animate-pulse"
            >
              <div className="w-12 h-16 bg-gray-300 rounded mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add NavBar component at the bottom */}
        <NavBar />
      </div>
    );
  }

  if (isCreatingNew) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8"
      >
        {/* Status Bar */}
        <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-6">
          <span>9:41</span>
          <div className="flex items-center space-x-2">
            <span>📶</span>
            <span>🔋 100%</span>
            <span className="ml-4 rounded-full bg-blue-100 px-2 py-0.5 text-blue-800">50</span>
            <ShieldCheck className="h-4 w-4 text-bookMingle-primary" />
          </div>
        </div>

        <div className="flex items-center mb-6">
          <button 
            onClick={() => setIsCreatingNew(false)}
            className="mr-4 text-bookMingle-primary flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold">Add to Wishlist</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3 transition-all focus-within:ring-2 focus-within:ring-bookMingle-primary focus-within:bg-opacity-100">
            <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
            <Input
              type="text"
              name="title"
              value={newItem.title}
              onChange={handleInputChange}
              placeholder="Title of the Book"
              required
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3 transition-all focus-within:ring-2 focus-within:ring-bookMingle-primary focus-within:bg-opacity-100">
            <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
            <Input
              type="text"
              name="author"
              value={newItem.author}
              onChange={handleInputChange}
              placeholder="Author"
              required
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3 transition-all focus-within:ring-2 focus-within:ring-bookMingle-primary focus-within:bg-opacity-100">
            <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
            <Input
              type="text"
              name="edition"
              value={newItem.edition}
              onChange={handleInputChange}
              placeholder="Edition of the Book"
              required
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3 transition-all focus-within:ring-2 focus-within:ring-bookMingle-primary focus-within:bg-opacity-100">
            <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
            <Input
              type="text"
              name="category"
              value={newItem.category}
              onChange={handleInputChange}
              placeholder="Category"
              required
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>
          
          {/* Image Placeholder */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 border-2 border-bookMingle-primary border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-bookMingle-card hover:bg-opacity-30 transition-colors">
              <ImagePlus className="h-8 w-8 text-bookMingle-primary mb-2" />
              <span className="text-xs text-bookMingle-primary">Add book cover</span>
            </div>
          </div>
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3 transition-all focus-within:ring-2 focus-within:ring-bookMingle-primary focus-within:bg-opacity-100">
            <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
            <Textarea
              name="description"
              value={newItem.description}
              onChange={handleInputChange}
              placeholder="Description about book"
              required
              className="border-0 bg-transparent focus-visible:ring-0 min-h-[100px]"
            />
          </div>
          
          <motion.div 
            className="flex justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <button 
              type="submit" 
              className="bg-bookMingle-button text-white py-2 px-10 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Done
            </button>
          </motion.div>
        </form>
      </motion.div>
    );
  }

  return (
    <div 
      className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 pb-20"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setStartY(null)}
    >
      {/* Pull to refresh indicator */}
      {isRefreshing && (
        <div className="absolute top-0 left-0 right-0 flex justify-center py-4 bg-bookMingle-background z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-bookMingle-primary"></div>
        </div>
      )}
      
      {/* Status Bar */}
      <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-6">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Info className="h-16 w-16 text-bookMingle-primary opacity-40 mx-auto mb-4" />
            <p>Your wishlist is empty</p>
            <motion.button
              onClick={() => setIsCreatingNew(true)}
              className="mt-4 bg-bookMingle-button text-white py-2 px-6 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Item
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map(item => (
              <motion.div 
                key={item.id}
                className="bg-bookMingle-card bg-opacity-70 p-4 rounded-xl flex items-center relative shadow-sm hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                <div 
                  className="w-12 h-16 bg-gray-200 rounded mr-3 overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  onClick={() => navigate(`/book/${item.id}`)}
                >
                  <img 
                    src={item.coverUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate(`/book/${item.id}`)}
                >
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs">{item.author}</p>
                  <p className="text-xs mt-1 bg-bookMingle-backgroundLight inline-block px-2 py-0.5 rounded-full text-bookMingle-text">{item.category}</p>
                </div>
                <motion.button 
                  className="absolute right-3 top-3 text-red-500 p-1 hover:bg-gray-200 rounded-full"
                  onClick={() => handleDeleteItem(item.id)}
                  disabled={isDeletingItem === item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isDeletingItem === item.id ? (
                    <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.button
            onClick={() => setIsCreatingNew(true)}
            className="w-full mt-6 bg-bookMingle-button text-white py-3 rounded-full flex items-center justify-center shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Item
          </motion.button>
        </div>
      )}
      
      {/* Add NavBar component at the bottom */}
      <NavBar />
    </div>
  );
};

export default WishlistPage;
