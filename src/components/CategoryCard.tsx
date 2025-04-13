
import React from 'react';
import { Category } from '../models/Category';
import { Book, BookOpen, Search, Rocket, Heart, User } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const getIcon = () => {
    switch (category.iconName) {
      case 'book':
        return <Book className="w-5 h-5" />;
      case 'book-open':
        return <BookOpen className="w-5 h-5" />;
      case 'search':
        return <Search className="w-5 h-5" />;
      case 'rocket':
        return <Rocket className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'user':
        return <User className="w-5 h-5" />;
      default:
        return <Book className="w-5 h-5" />;
    }
  };

  const backgroundColor = category.color;
  
  return (
    <div className="category-card flex flex-col items-center p-4 rounded-xl" style={{ backgroundColor }}>
      <div className="bg-white p-3 rounded-full">
        {getIcon()}
      </div>
      <h3 className="mt-2 text-white font-medium text-sm">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
