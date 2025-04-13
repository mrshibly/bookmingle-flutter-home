
import React from 'react';
import { Book } from '../models/Book';
import { Star, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, compact = false }) => {
  const cardClass = compact 
    ? "w-32 h-48 book-card"
    : "w-40 h-64 book-card";
    
  return (
    <div className={`relative ${cardClass} rounded-lg overflow-hidden shadow-md bg-white`}>
      {book.isFavorite && (
        <div className="absolute top-1 right-1 z-10">
          <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
        </div>
      )}
      
      <div className="h-full w-full relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="h-full w-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <h3 className="text-white font-medium text-sm line-clamp-1">{book.title}</h3>
          <p className="text-gray-200 text-xs line-clamp-1">{book.author}</p>
          
          <div className="flex items-center mt-1">
            <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
            <span className="text-white text-xs ml-1">{book.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
