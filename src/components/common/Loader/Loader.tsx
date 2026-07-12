import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8" role="status" aria-label="Loading">
      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
