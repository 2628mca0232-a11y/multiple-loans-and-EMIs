import React from 'react';

export const Card = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'p-6',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl border transition-all duration-200 ${
        glass
          ? 'glass-card shadow-sm'
          : 'bg-white border-slate-200/80 shadow-xs'
      } ${
        hover
          ? 'hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5'
          : ''
      } ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
