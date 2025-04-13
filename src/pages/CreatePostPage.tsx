
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ImageIcon, Plus, ArrowLeft } from 'lucide-react';
import { createPost } from '@/services/postService';
import NavBar from '@/components/NavBar';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a post",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // In a real app, we would upload the image to storage here
      // For now, we'll just use a placeholder if no URL is provided
      const finalCoverUrl = coverUrl || 'https://placehold.co/400x600?text=No+Image';
      
      await createPost({
        title,
        author,
        edition,
        category,
        description,
        coverUrl: finalCoverUrl,
        ownerId: user.id
      });
      
      toast({
        title: "Post Created",
        description: "Your book has been successfully posted!",
      });
      
      navigate('/home');
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 pb-20">
      {/* Status Bar */}
      <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-6">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/home')}
          className="mr-4 text-bookMingle-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-20">
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the Book"
            required
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Input
            type="text"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
            placeholder="Edition of the Book"
            required
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Input
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="Cover Image URL"
            className="border-0 bg-transparent focus-visible:ring-0"
          />
        </div>
        
        {/* Image Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 border-2 border-black rounded-lg flex items-center justify-center">
            {coverUrl ? (
              <img src={coverUrl} alt="Book cover" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <ImageIcon className="h-12 w-12" />
            )}
          </div>
        </div>
        
        <div className="mb-4 flex items-center bg-bookMingle-card bg-opacity-80 rounded-xl pl-3">
          <Plus className="h-5 w-5 text-bookMingle-text opacity-70" />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description about book"
            required
            className="border-0 bg-transparent focus-visible:ring-0 min-h-[100px]"
          />
        </div>
        
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="bg-bookMingle-button text-white py-2 px-10 rounded-full hover:bg-opacity-90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Done"}
          </button>
        </div>
      </form>
      
      <NavBar />
    </div>
  );
};

export default CreatePostPage;
