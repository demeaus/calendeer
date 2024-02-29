function ButtonIcon({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-yellow-600 p-3 text-stone-100 hover:bg-yellow-500 hover:text-stone-800"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
