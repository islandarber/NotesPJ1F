import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-200 py-2 text-center">
      <div className="flex items-center justify-center">
        <a
          href="https://github.com/islandarber"
          target="_blank"
          rel="noopener noreferrer"
          className="h-6 w-6 mr-2"
        >
          <img 
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
            alt="GitHub Logo" 
            className="h-6 w-6 mr-2"
          />
        </a>
        <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Christina Vekri. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
