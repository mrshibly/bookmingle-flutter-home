
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Plus, ShieldCheck, Trash2 } from 'lucide-react';
import { getWishlistItems, getMockWishlistItems, removeFromWishlist } from '@/services/postService';
import { WishlistItem } from '@/models/WishlistItem';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState<string | null>(null);
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
        const mockItems = getMockWishlistItems();
        setWishlistItems(mockItems);
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

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background flex items-center justify-center">
        <p>Loading wishlist...</p>
      </div>
    );
  }

  if (isCreatingNew) {
    return (
      <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8">
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
            className="mr-4 text-bookMingle-primary"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Add to Wishlist</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
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
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
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
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
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
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
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
            <div className="w-32 h-32 border-2 border-black rounded-lg flex items-center justify-center">
              <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          
          <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
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
          
          <div className="flex justify-center">
            <button 
              type="submit" 
              className="bg-bookMingle-card text-bookMingle-text py-2 px-10 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8">
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
          <p>Your wishlist is empty</p>
          <button
            onClick={() => setIsCreatingNew(true)}
            className="mt-4 bg-bookMingle-button text-white py-2 px-6 rounded-full"
          >
            Add Item
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map(item => (
            <div 
              key={item.id}
              className="bg-bookMingle-card bg-opacity-70 p-4 rounded-xl flex items-center relative"
            >
              <div 
                className="w-12 h-16 bg-gray-200 rounded mr-3 overflow-hidden cursor-pointer"
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
                <p className="text-xs mt-1">{item.category}</p>
              </div>
              <button 
                className="absolute right-3 top-3 text-red-500 p-1 hover:bg-gray-200 rounded-full"
                onClick={() => handleDeleteItem(item.id)}
                disabled={isDeletingItem === item.id}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          <button
            onClick={() => setIsCreatingNew(true)}
            className="w-full mt-6 bg-bookMingle-button text-white py-3 rounded-full flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Item
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
