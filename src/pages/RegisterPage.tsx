import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { User, AtSign, Lock, Map, ChevronDown } from 'lucide-react';

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", 
  "Germany", "France", "Japan", "India", "Brazil", "South Africa",
  "Bangladesh", "Pakistan", "Sri Lanka", "Nepal", "China"
];

const RegisterPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, fullName, country, postalCode);
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Welcome to BookMingle!",
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
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 flex flex-col">
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
          className="text-2xl font-bold text-center mb-6"
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
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="pl-10 bg-white/80 backdrop-blur-sm border-none rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </motion.div>
          
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
            className="mb-4 relative"
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
          
          <motion.div 
            className="mb-4 relative"
            variants={itemVariants}
          >
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="pl-10 bg-white/80 backdrop-blur-sm border-none rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </motion.div>
          
          <motion.div
            className="mb-4 relative"
            variants={itemVariants}
          >
            <Select value={country} onValueChange={setCountry} required>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border-none rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50 h-[42px]">
                <div className="flex items-center">
                  <Map className="mr-2 h-4 w-4 text-bookMingle-primary/70" />
                  <SelectValue placeholder="Select your Country" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-80 overflow-y-auto">
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
          
          <motion.div 
            className="mb-6 relative"
            variants={itemVariants}
          >
            <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code and address"
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
            {isLoading ? "Registering..." : "Register"}
          </motion.button>
        </motion.form>

        <motion.div 
          className="mt-6 text-center"
          variants={itemVariants}
        >
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-bookMingle-primary font-medium underline hover:text-bookMingle-accent transition-colors">
              Login
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
