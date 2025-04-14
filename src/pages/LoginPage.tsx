
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { AtSign, Lock, ArrowRight } from 'lucide-react';

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
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-10 flex flex-col">
      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-24 h-24 bg-bookMingle-primary rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="fixed bottom-0 right-0 w-40 h-40 bg-bookMingle-primary rounded-full translate-x-1/3 translate-y-1/3 opacity-40"></div>

      <motion.div
        className="flex-1 flex flex-col items-center justify-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-2xl font-bold text-center mb-8"
          variants={itemVariants}
        >
          Welcome to BookMingle
        </motion.h1>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="w-full max-w-sm"
          variants={containerVariants}
        >
          <motion.div 
            className="mb-4 relative"
            variants={itemVariants}
          >
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your E-mail"
              required
              className="pl-10 bg-white/80 backdrop-blur-sm border-none rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </motion.div>
          
          <motion.div 
            className="mb-6 relative"
            variants={itemVariants}
          >
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="pl-10 bg-white/80 backdrop-blur-sm border-none rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </motion.div>
          
          <motion.button 
            type="submit" 
            className="w-full flex items-center justify-center bg-bookMingle-button text-white py-3 px-4 rounded-full font-medium hover:bg-opacity-90 transition-colors shadow-md"
            disabled={isLoading}
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="flex items-center">
                Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </motion.button>
        </motion.form>

        <motion.div 
          className="mt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-bookMingle-primary font-medium underline hover:text-bookMingle-accent transition-colors">
              SignUp
            </Link>
          </p>
          <Link to="/" className="text-xs text-gray-500 mt-2 block hover:text-gray-700 transition-colors">
            Back to splash screen
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
