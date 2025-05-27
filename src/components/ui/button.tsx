
import React from 'react';

export const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-coral-red text-white rounded hover:bg-red-500 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
