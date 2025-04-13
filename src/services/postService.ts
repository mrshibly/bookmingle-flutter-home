
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
  
  // Map the DB response to our Post model
  return (data || []).map(post => ({
    id: post.id,
    title: post.title,
    author: post.author,
    edition: post.edition,
    category: post.category,
    description: post.description,
    coverUrl: post.cover_url,
    ownerId: post.owner_id,
    createdAt: post.created_at
  }));
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
  
  if (!data) return null;
  
  // Map the DB response to our Post model
  return {
    id: data.id,
    title: data.title,
    author: data.author,
    edition: data.edition,
    category: data.category,
    description: data.description,
    coverUrl: data.cover_url,
    ownerId: data.owner_id,
    createdAt: data.created_at
  };
};

// Create a new post
export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  // Convert our Post model to match the DB schema
  const dbPost = {
    title: post.title,
    author: post.author,
    edition: post.edition,
    category: post.category,
    description: post.description,
    cover_url: post.coverUrl,
    owner_id: post.ownerId
  };
  
  const { data, error } = await supabase
    .from('posts')
    .insert([dbPost])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }
  
  // Map the DB response back to our Post model
  return {
    id: data.id,
    title: data.title,
    author: data.author,
    edition: data.edition,
    category: data.category,
    description: data.description,
    coverUrl: data.cover_url,
    ownerId: data.owner_id,
    createdAt: data.created_at
  };
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
  
  // Map the DB response to our WishlistItem model
  return (data || []).map(item => ({
    id: item.id,
    title: item.title,
    author: item.author,
    edition: item.edition,
    category: item.category,
    description: item.description,
    coverUrl: item.cover_url,
    userId: item.user_id,
    createdAt: item.created_at
  }));
};

// Add item to wishlist
export const addToWishlist = async (item: Omit<WishlistItem, 'id' | 'createdAt'>): Promise<WishlistItem> => {
  // Convert our WishlistItem model to match the DB schema
  const dbItem = {
    title: item.title,
    author: item.author,
    edition: item.edition,
    category: item.category,
    description: item.description,
    cover_url: item.coverUrl,
    user_id: item.userId
  };
  
  const { data, error } = await supabase
    .from('wishlist')
    .insert([dbItem])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
  
  // Map the DB response back to our WishlistItem model
  return {
    id: data.id,
    title: data.title,
    author: data.author,
    edition: data.edition,
    category: data.category,
    description: data.description,
    coverUrl: data.cover_url,
    userId: data.user_id,
    createdAt: data.created_at
  };
};

// Delete an item from wishlist
export const removeFromWishlist = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
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
