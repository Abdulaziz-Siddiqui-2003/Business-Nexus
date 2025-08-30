import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '',
  fallback = null 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const renderContent = () => {
    if (src) {
      return (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    
    if (fallback) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-primary-600 text-white font-medium rounded-full">
          {getInitials(fallback)}
        </div>
      );
    }
    
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-medium rounded-full">
        ?
      </div>
    );
  };

  return (
    <div className={`${sizes[size]} ${className} rounded-full overflow-hidden`}>
      {renderContent()}
    </div>
  );
};

export default Avatar; 