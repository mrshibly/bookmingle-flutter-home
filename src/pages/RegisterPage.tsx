
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { ChevronDown } from 'lucide-react';

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", 
  "Germany", "France", "Japan", "India", "Brazil", "South Africa"
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

  return (
    <div className="max-w-md mx-auto min-h-screen bg-bookMingle-background px-6 py-8 flex flex-col">
      {/* Status Bar */}
      <div className="bg-transparent text-black flex justify-between items-center px-4 py-1 text-xs mb-6">
        <span>9:41</span>
        <div className="flex items-center space-x-2">
          <span>📶</span>
          <span>🔋 100%</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Welcome to BookMingle</h1>
      
      <form onSubmit={handleSubmit} className="mt-2">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          required
          className="bookmingle-input"
        />
        
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
        
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          className="bookmingle-input"
        />
        
        <Select value={country} onValueChange={setCountry} required>
          <SelectTrigger className="bookmingle-input">
            <SelectValue placeholder="Select your Country" />
            <ChevronDown className="h-4 w-4" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Enter postal code and address"
          required
          className="bookmingle-input"
        />
        
        <button 
          type="submit" 
          className="bookmingle-button mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already have an account? {" "}
          <Link to="/login" className="text-bookMingle-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
