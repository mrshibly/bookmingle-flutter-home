
import React, { useState, useEffect } from 'react';
import { Book, Menu, Bell, Plus, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getPosts, getMockPosts } from '@/services/postService';
import { Post } from '@/models/Post';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Post[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        // In development mode, use mock data
        if (process.env.NODE_ENV === 'development') {
          const mockBooks = getMockPosts();
          setBooks(mockBooks);
          setFilteredBooks(mockBooks);
        } else {
          const fetchedBooks = await getPosts();
          setBooks(fetchedBooks);
          setFilteredBooks(fetchedBooks);
        }
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
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, books]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteBook = async (id: string) => {
    // In a real app, this would call an API to delete the book
    // For now, we'll just remove it from the state
    try {
      toast({
        title: "Book Deleted",
        description: "The book has been removed from your listings",
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

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* App Bar */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={() => setMenuOpen(true)} className="mr-3">
              <Menu className="h-6 w-6 text-white" />
            </button>
            <div className="flex items-center">
              <Book className="h-6 w-6 text-bookMingle-accent mr-2" />
              <h1 className="text-xl font-bold text-white">BookMingle</h1>
            </div>
          </div>
          <button className="p-1 rounded-full">
            <Bell className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Side Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div 
              className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl z-50 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <Book className="h-6 w-6 text-bookMingle-primary mr-2" />
                  <h1 className="text-xl font-bold">BookMingle</h1>
                </div>
                <button onClick={() => setMenuOpen(false)}>
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              <div className="flex-1 overflow-auto">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-bookMingle-card flex items-center justify-center">
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{user?.email?.split('@')[0] || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || ''}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-2">
                  <ul className="space-y-1">
                    <li>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/home');
                        }}
                        className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Book className="h-5 w-5 text-bookMingle-primary mr-3" />
                        <span>Home</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/library');
                        }}
                        className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Book className="h-5 w-5 text-bookMingle-primary mr-3" />
                        <span>My Library</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/wishlist');
                        }}
                        className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Book className="h-5 w-5 text-bookMingle-primary mr-3" />
                        <span>Wishlist</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setMenuOpen(false);
                          navigate('/profile');
                        }}
                        className="flex items-center w-full px-4 py-2 rounded-lg hover:bg-gray-100"
                      >
                        <Book className="h-5 w-5 text-bookMingle-primary mr-3" />
                        <span>Profile</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="p-4 border-t">
                <button 
                  onClick={handleLogout} 
                  className="text-red-500 flex items-center"
                >
                  <Book className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto">
        {/* Search */}
        <div className="relative my-4">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search books, authors, categories..."
            className="pl-10 pr-4 py-2.5 w-full bg-gray-100 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-bookMingle-primary"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Create Post Button */}
        <div className="mb-6 flex justify-center">
          <button 
            onClick={() => navigate('/create-post')}
            className="bg-bookMingle-button text-white px-6 py-2 rounded-full flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Post
          </button>
        </div>

        {/* Books */}
        <section className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Books</h2>
          
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
              <p>No books found</p>
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
                  {book.userId === user?.id && (
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBook(book.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  )}
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

export default HomePage;
