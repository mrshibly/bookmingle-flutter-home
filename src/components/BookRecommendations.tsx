
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';
import { motion } from 'framer-motion';
import { Post } from '@/models/Post';

interface BookRecommendationsProps {
  books: Post[];
  title?: string;
}

const BookRecommendations: React.FC<BookRecommendationsProps> = ({ 
  books, 
  title = "Recommended for You" 
}) => {
  const navigate = useNavigate();
  
  if (books.length === 0) return null;
  
  return (
    <div className="mt-6">
      <div className="flex items-center mb-4">
        <Book className="text-bookMingle-primary mr-2" size={20} />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {books.map((book) => (
            <motion.div
              key={book.id}
              className="flex-shrink-0 w-32"
              whileHover={{ y: -5 }}
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="h-44 overflow-hidden rounded-md shadow-md">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-1">{book.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{book.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookRecommendations;
