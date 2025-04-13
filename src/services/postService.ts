
import { Post } from "@/models/Post";
import { WishlistItem } from "@/models/WishlistItem";
import { supabase } from "@/integrations/supabase/client";
import { getMockBooks, getMockWishlistItems } from "./mockDataService";

// Get all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(post => ({
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
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get a post by ID
export const getPostById = async (id: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No post found with that ID
      }
      throw new Error(error.message);
    }

    if (!data) return null;

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
  } catch (error: any) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
};

// Create a new post
export const createPost = async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: post.title,
        author: post.author,
        edition: post.edition,
        category: post.category,
        description: post.description,
        cover_url: post.coverUrl,
        owner_id: post.ownerId
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

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
  } catch (error: any) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Add a book to wishlist
export const addToWishlist = async (book: {
  title: string;
  author: string;
  edition: string;
  category: string;
  description: string;
  coverUrl: string;
  userId: string;
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from('wishlist')
      .insert({
        title: book.title,
        author: book.author,
        edition: book.edition,
        category: book.category,
        description: book.description,
        cover_url: book.coverUrl,
        user_id: book.userId
      });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Get wishlist items for the current user
export const getWishlistItems = async (userId: string): Promise<WishlistItem[]> => {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map(item => ({
      id: item.id,
      title: item.title,
      author: item.author,
      edition: item.edition,
      category: item.category,
      description: item.description,
      coverUrl: item.cover_url,
      userId: item.user_id, // Map user_id to userId for WishlistItem type
      createdAt: item.created_at
    }));
  } catch (error: any) {
    console.error('Error fetching wishlist items:', error);
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (itemId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('id', itemId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// For development purposes, get mock posts
export const getMockPosts = (): Post[] => {
  const mockBooks = getMockBooks();
  
  return mockBooks.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    edition: "First Edition",
    category: book.genres?.[0] || book.genre || "Fiction",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    coverUrl: book.coverUrl,
    ownerId: "12345",
    createdAt: new Date().toISOString()
  }));
};

// For development purposes, get mock wishlist items
export const getMockWishlistItems = (): WishlistItem[] => {
  return getMockWishlistItems();
};
