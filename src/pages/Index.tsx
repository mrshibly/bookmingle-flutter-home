
import React from 'react';
import HomePage from './HomePage';

const Index = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white overflow-hidden shadow-lg">
      <div className="relative">
        {/* Status Bar */}
        <div className="bg-black text-white flex justify-between items-center px-4 py-1 text-xs">
          <span>9:41</span>
          <div className="flex items-center space-x-2">
            <span>📶</span>
            <span>🔋 100%</span>
          </div>
        </div>
        
        {/* Flutter App */}
        <HomePage />
      </div>
    </div>
  );
};

export default Index;
