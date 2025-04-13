import { Book } from '../models/Book';
import { Category } from '../models/Category';
import { Post } from '@/models/Post';
import { WishlistItem } from '@/models/WishlistItem';

export const getFeaturedBooks = (): Book[] => {
  return [
    {
      id: '1',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      coverUrl: 'https://m.media-amazon.com/images/I/41hq+adxXJL._SY445_SX342_.jpg',
      rating: 4.5,
      isFavorite: true,
      genre: 'Thriller',
      addedDate: '2023-10-15',
      ownerName: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      coverUrl: 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg',
      rating: 4.8,
      isFavorite: false,
      genre: 'Self-Help',
      addedDate: '2023-11-20',
      ownerName: 'Michael Blake'
    },
    {
      id: '3',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverUrl: 'https://m.media-amazon.com/images/I/41SrA28jZ4L._SY445_SX342_.jpg',
      rating: 4.3,
      isFavorite: true,
      genre: 'Fiction',
      addedDate: '2023-09-05',
      ownerName: 'Emma Wilson'
    },
    {
      id: '4',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      coverUrl: 'https://m.media-amazon.com/images/I/51vR6Jp5m0S._SY445_SX342_.jpg',
      rating: 4.7,
      isFavorite: true,
      genre: 'Science Fiction',
      addedDate: '2023-12-01',
      ownerName: 'David Cooper'
    },
    {
      id: '5',
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      coverUrl: 'https://m.media-amazon.com/images/I/41KaqVvCOwL._SY445_SX342_.jpg',
      rating: 4.6,
      isFavorite: false,
      genre: 'Fiction',
      addedDate: '2023-10-22',
      ownerName: 'Jennifer Morris'
    }
  ];
};

export const getRecentlyAddedBooks = (): Book[] => {
  return [
    {
      id: '6',
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      coverUrl: 'https://m.media-amazon.com/images/I/51J3GtQn7GL._SY445_SX342_.jpg',
      rating: 4.6,
      isFavorite: false,
      genre: 'Fantasy',
      addedDate: '2025-04-10',
      ownerName: 'Alex Patel'
    },
    {
      id: '7',
      title: 'Iron Flame',
      author: 'Rebecca Yarros',
      coverUrl: 'https://m.media-amazon.com/images/I/51FVPiq6O5L._SY445_SX342_.jpg',
      rating: 4.8,
      isFavorite: true,
      genre: 'Fantasy',
      addedDate: '2025-04-09',
      ownerName: 'Taylor Williams'
    },
    {
      id: '8',
      title: 'A Court of Thorns and Roses',
      author: 'Sarah J. Maas',
      coverUrl: 'https://m.media-amazon.com/images/I/51r7ljJ1+FL._SY445_SX342_.jpg',
      rating: 4.5,
      isFavorite: false,
      genre: 'Fantasy',
      addedDate: '2025-04-08',
      ownerName: 'Chris Miller'
    },
    {
      id: '9',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      coverUrl: 'https://m.media-amazon.com/images/I/41r6F2LRf8L._SY445_SX342_.jpg',
      rating: 4.7,
      isFavorite: true,
      genre: 'Finance',
      addedDate: '2025-04-07',
      ownerName: 'Rachel Green'
    }
  ];
};

export const getCategories = (): Category[] => {
  return [
    {
      id: '1',
      name: 'Fiction',
      iconName: 'book-open',
      color: '#4CAF50' // Green
    },
    {
      id: '2',
      name: 'Non-Fiction',
      iconName: 'book',
      color: '#2196F3' // Blue
    },
    {
      id: '3',
      name: 'Mystery',
      iconName: 'search',
      color: '#9C27B0' // Purple
    },
    {
      id: '4',
      name: 'Science Fiction',
      iconName: 'rocket',
      color: '#FF9800' // Orange
    },
    {
      id: '5',
      name: 'Self-Help',
      iconName: 'heart',
      color: '#E91E63' // Pink
    },
    {
      id: '6',
      name: 'Biography',
      iconName: 'user',
      color: '#00BCD4' // Cyan
    }
  ];
};

export const getMockBooks = (): Book[] => {
  return [
    ...getFeaturedBooks(),
    ...getRecentlyAddedBooks()
  ];
};

export const getMockWishlistItems = (): WishlistItem[] => {
  const books = getMockBooks().slice(0, 3);
  
  return books.map(book => ({
    id: `wish-${book.id}`,
    title: book.title,
    author: book.author,
    edition: "First Edition",
    category: book.genre,
    description: "This is a book I would like to read.",
    coverUrl: book.coverUrl,
    userId: "12345",
    createdAt: new Date().toISOString()
  }));
};
