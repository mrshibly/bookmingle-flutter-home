
import React from 'react';
import { Book } from '../models/Book';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  compact?: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, compact = false }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
      {books.map(book => (
        <BookCard key={book.id} book={book} compact={compact} />
      ))}
    </div>
  );
};

export default BookList;
