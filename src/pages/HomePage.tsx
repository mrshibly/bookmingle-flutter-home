
import React, { useState, useEffect } from 'react';
import { Book, Menu, Bell, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { getPosts, getMockPosts } from '@/services/postService';
import { Post } from '@/models/Post';

const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Post[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const navigate = useNavigate();
  const { user } = useAuth();
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

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* App Bar */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-white mr-3" />
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
            <div className="text-center py-10">
              <p>Loading books...</p>
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
            <div className="grid grid-cols-2 gap-4">
              {filteredBooks.map(book => (
                <div 
                  key={book.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                  onClick={() => navigate(`/book/${book.id}`)}
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{book.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
};

export default HomePage;
