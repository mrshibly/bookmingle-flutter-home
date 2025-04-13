
import React from 'react';

interface SectionTitleProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  actionText = "See All",
  onActionClick 
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {onActionClick && (
        <button 
          onClick={onActionClick}
          className="text-sm font-medium text-bookMingle-primary"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SectionTitle;
