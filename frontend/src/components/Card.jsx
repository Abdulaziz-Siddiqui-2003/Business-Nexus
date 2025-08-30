import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  shadow = 'shadow-sm',
  ...props 
}) => {
  return (
    <div 
      className={`card ${padding} ${shadow} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 