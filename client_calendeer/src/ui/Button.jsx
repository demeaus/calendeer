function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-yellow-600 px-4 py-2 text-stone-100 hover:bg-yellow-500 hover:text-stone-800"
    >
      {children}
    </button>
  );
}

export default Button;
