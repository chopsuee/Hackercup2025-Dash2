'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User } from '@/types';
const UserIcon = () => <span>👤</span>;
const UserCheck = () => <span>✓</span>;

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

export default function LoginDialog({ isOpen, onClose, onLogin }: LoginDialogProps) {
  const [name, setName] = useState('');

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: `guest-${Date.now()}`,
      name: 'Guest User',
      isGuest: true
    };
    onLogin(guestUser);
    onClose();
  };

  const handleQuickLogin = () => {
    if (!name.trim()) return;
    
    const user: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      isGuest: false
    };
    onLogin(user);
    onClose();
    setName('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserIcon className="w-5 h-5" />
            Quick Access
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name (Optional)</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              onKeyPress={(e) => e.key === 'Enter' && handleQuickLogin()}
            />
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={handleQuickLogin}
              disabled={!name.trim()}
              className="w-full"
            >
              <UserCheck />
              Continue as {name.trim() || 'User'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleGuestLogin}
              className="w-full"
            >
              <UserIcon />
              Continue as Guest
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center">
            Login to report queue status and help other commuters
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}