
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        navigate('/home');
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-12 flex flex-col">
      {/* Status Bar */}
      <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-12">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-8">Welcome to BookMingle</h1>
      
      <form onSubmit={handleSubmit} className="mt-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your E-mail"
          required
          className="bookmingle-input"
        />
        
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="bookmingle-input"
        />
        
        <button 
          type="submit" 
          className="bookmingle-button mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm">
          Don't have an account? {" "}
          <Link to="/register" className="text-bookMingle-primary font-medium">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
