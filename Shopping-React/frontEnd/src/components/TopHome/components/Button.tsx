const Button = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`h-8 px-4 text-center text-sm capitalize ${
        isActive
          ? "bg-primary text-white hover:bg-primary/80"
          : "bg-white text-black hover:bg-slate-100"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
