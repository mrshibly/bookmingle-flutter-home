
import { supabase } from '@/integrations/supabase/client';
import { Post } from '@/models/Post';
import { WishlistItem } from '@/models/WishlistItem';

// Get posts
export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
  
  return data || [];
};

// Get post by ID
export const getPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
  
  return data;
};

// Create a new post
export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  return data;
};

// Get wishlist items for a user
export const getWishlistItems = async (userId: string): Promise<WishlistItem[]> => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
  
  return data || [];
};

// Add item to wishlist
export const addToWishlist = async (item: Omit<WishlistItem, 'id' | 'createdAt'>): Promise<WishlistItem> => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([item])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
  
  return data;
};

// Mock data for development (when not using real backend)
export const getMockPosts = (): Post[] => {
  return [
    {
      id: '1',
      title: 'Artificial Intelligence',
      author: 'Stuart Russell & Peter Norvig',
      edition: 'Fourth Edition',
      category: 'Academic',
      description: 'Artificial Intelligence is a academic book. Written by Stuart Russel and Peter Norvig. This is fourth edition of the book. The book contains details about AI. I highly recommend this book.',
      coverUrl: 'https://m.media-amazon.com/images/I/51Y1XsofQAL._SY342_.jpg',
      ownerId: 'user1',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien',
      edition: 'Special Edition',
      category: 'Fiction',
      description: 'An epic fantasy novel that follows the quest to destroy a powerful ring and save Middle-earth from the Dark Lord Sauron.',
      coverUrl: 'https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg',
      ownerId: 'user2',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '3',
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      edition: 'First Edition',
      category: 'Non-Fiction',
      description: 'A book that explores the history of the human species from the evolution of archaic human species to the present day.',
      coverUrl: 'https://m.media-amazon.com/images/I/71N3-2TFdtL._AC_UF1000,1000_QL80_.jpg',
      ownerId: 'user3',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];
};

export const getMockWishlistItems = (): WishlistItem[] => {
  return [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      edition: 'Vintage Classics Edition',
      category: 'Fiction',
      description: 'A novel about the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
      coverUrl: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg',
      userId: 'user1',
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      edition: 'First Edition',
      category: 'Psychology',
      description: 'The book summarizes research that Kahneman conducted over decades, often in collaboration with Amos Tversky. It covers all three phases of his career.',
      coverUrl: 'https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg',
      userId: 'user1',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
};
