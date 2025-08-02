import React, { useEffect } from 'react';

export default function SearchBarWrapper() {
  useEffect(() => {
    // Wait for Google Custom Search script to load
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="gcse-search" 
      style={{
        width: '300px',
        marginRight: '10px'
      }}
    />
  );
}
