// components/button.tsx
import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
  className?: string; // Añade esta línea
};

const Button: React.FC<Props> = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2  rounded-md font-medium ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
