
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Clock, Send } from 'lucide-react';
import { format } from 'date-fns';
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
  const [chatHistory, setChatHistory] = useState<{id: string; content: string; senderId: string; createdAt: string}[]>([]);

  useEffect(() => {
    if (open && user && recipientId) {
      // Simulate fetching chat history
      const mockChatHistory = [
        {
          id: '1',
          content: "Hi, I'm interested in borrowing your book.",
          senderId: user.id,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2', 
          content: "Sure! When would you like to pick it up?",
          senderId: recipientId,
          createdAt: new Date(Date.now() - 3000000).toISOString()
        }
      ];
      setChatHistory(mockChatHistory);
    }
  }, [open, user, recipientId]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    try {
      // In a real app, we would send the message to the backend
      // For now, we'll just simulate a delay and show a success toast
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Add the message to the chat history
      const newMessage = {
        id: Date.now().toString(),
        content: message,
        senderId: user?.id || '',
        createdAt: new Date().toISOString()
      };
      
      setChatHistory([...chatHistory, newMessage]);
      
      toast({
        title: "Message sent",
        description: `Your message has been sent to ${recipientName}.`
      });
      
      setMessage('');
      
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

  const formatMessageTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Message to {recipientName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          {/* Chat history */}
          <div className="max-h-60 overflow-y-auto border rounded-xl p-3 bg-gray-50">
            {chatHistory.length > 0 ? (
              <div className="space-y-3">
                {chatHistory.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg px-3 py-2 ${
                        msg.senderId === user?.id 
                          ? 'bg-bookMingle-primary text-white' 
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      <p className="break-words">{msg.content}</p>
                      <div className={`text-xs mt-1 flex items-center ${
                        msg.senderId === user?.id ? 'text-white/70 justify-end' : 'text-gray-500'
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {formatMessageTime(msg.createdAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-4">
                <p>Start a conversation with {recipientName}</p>
              </div>
            )}
          </div>
          
          {/* Message input */}
          <Textarea
            placeholder="Write your message here..."
            className="min-h-20 border rounded-xl shadow-sm focus:ring-2 focus:ring-bookMingle-primary/50"
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
            className="bg-bookMingle-primary text-white hover:bg-opacity-90 flex gap-2 items-center"
          >
            {isLoading ? "Sending..." : (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
