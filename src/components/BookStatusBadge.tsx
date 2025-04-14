
import React from 'react';
import { BookStatus, getStatusColor, getStatusLabel } from '@/models/BookStatus';

interface BookStatusBadgeProps {
  status: BookStatus;
  className?: string;
}

const BookStatusBadge: React.FC<BookStatusBadgeProps> = ({ 
  status, 
  className = '' 
}) => {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full ${colorClass} ${className}`}>
      {label}
    </span>
  );
};

export default BookStatusBadge;
