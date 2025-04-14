
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Map, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", 
  "Germany", "France", "Japan", "India", "Brazil", "South Africa",
  "Bangladesh", "Pakistan", "Sri Lanka", "Nepal", "China"
];

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ open, onOpenChange }) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [country, setCountry] = useState(user?.user_metadata?.country || '');
  const [postalCode, setPostalCode] = useState(user?.user_metadata?.postal_code || '');

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await updateProfile({
        full_name: fullName,
        country,
        postal_code: postalCode
      });
      
      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully."
        });
        onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              className="pl-10 bg-white/80 backdrop-blur-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </div>
          
          <div className="relative">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="bg-white/80 backdrop-blur-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50 h-[42px]">
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
          </div>
          
          <div className="relative">
            <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookMingle-primary/70" size={18} />
            <Input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              className="pl-10 bg-white/80 backdrop-blur-sm border rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            />
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="bg-bookMingle-primary text-white hover:bg-opacity-90"
          >
            {isLoading ? "Updating..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
