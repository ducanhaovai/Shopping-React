import React from "react";

interface ButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`h-8 px-4 text-center text-sm capitalize ${
        isActive
          ? "bg-orange text-white hover:bg-primary/80"
          : "bg-white text-black hover:bg-slate-100"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
