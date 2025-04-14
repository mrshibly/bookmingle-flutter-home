
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  recipientId: string;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ 
  open, 
  onOpenChange, 
  recipientName,
  recipientId 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, we would send the message to the backend
      // For now, we'll just simulate a delay and show a success toast
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent",
        description: `Your message has been sent to ${recipientName}.`
      });
      
      setMessage('');
      onOpenChange(false);
      
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send message",
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
          <DialogTitle>Message to {recipientName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <Textarea
            placeholder="Write your message here..."
            className="min-h-32 border rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !message.trim()}
            className="bg-bookMingle-primary text-white hover:bg-opacity-90"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
