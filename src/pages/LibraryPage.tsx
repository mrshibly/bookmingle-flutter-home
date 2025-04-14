
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Book, Trash2, Search, Filter, Plus } from 'lucide-react';
import NavBar from '@/components/NavBar';
import { getPosts, getMockPosts } from '@/services/postService';
import { Post } from '@/models/Post';
import { motion, AnimatePresence } from 'framer-motion';

const LibraryPage: React.FC = () => {
  const [books, setBooks] = useState<Post[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        // In development mode, use mock data
        let fetchedBooks: Post[] = [];
        if (process.env.NODE_ENV === 'development') {
          fetchedBooks = getMockPosts();
        } else {
          fetchedBooks = await getPosts();
        }
        
        // Filter only user's books
        const userBooks = fetchedBooks.filter(book => book.userId === user?.id);
        setBooks(userBooks);
        setFilteredBooks(userBooks);
      } catch (err: any) {
        console.error("Error fetching books:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to fetch books",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [toast, user]);

  // Search and filter books
  useEffect(() => {
    let result = [...books];
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter !== 'all') {
      result = result.filter(book => book.category.toLowerCase() === activeFilter.toLowerCase());
    }
    
    setFilteredBooks(result);
  }, [searchTerm, books, activeFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteBook = async (id: string) => {
    // In a real app, this would call an API to delete the book
    // For now, we'll just remove it from the state
    try {
      toast({
        title: "Book Deleted",
        description: "The book has been removed from your library",
      });
      
      // Remove from state
      setBooks(prev => prev.filter(book => book.id !== id));
      setFilteredBooks(prev => prev.filter(book => book.id !== id));
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete book",
        variant: "destructive"
      });
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(books.map(book => book.category.toLowerCase()))];

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* Header */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-3">
              <Book className="h-6 w-6 text-white" />
            </button>
            <h1 className="text-xl font-bold text-white">My Library</h1>
          </div>
          <button onClick={() => navigate('/create-post')} className="p-1 rounded-full bg-white">
            <Plus className="h-5 w-5 text-bookMingle-primary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto">
        {/* Search */}
        <div className="relative my-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search books, authors..."
            className="pl-10 pr-4 py-2.5 w-full bg-gray-100 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-bookMingle-primary"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Category Filters */}
        <div className="flex overflow-x-auto py-2 mb-4 hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1 rounded-full mr-2 text-sm whitespace-nowrap ${
                activeFilter === category 
                  ? 'bg-bookMingle-primary text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Books */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My Books</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                  <div className="h-40 bg-gray-200"></div>
                  <div className="p-3">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4 mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-10">
              <p>No books found in your library</p>
              <button 
                onClick={() => navigate('/create-post')}
                className="mt-4 bg-bookMingle-button text-white px-6 py-2 rounded-full"
              >
                Add your first book
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
            >
              {filteredBooks.map(book => (
                <motion.div 
                  key={book.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md relative book-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                >
                  <div 
                    className="h-40 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div 
                    className="p-3"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{book.category}</span>
                    </div>
                  </div>
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBook(book.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
};

export default LibraryPage;
