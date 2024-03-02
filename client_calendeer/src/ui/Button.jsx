function Button({ children, type = "primary", form, onClick }) {
  const base = "rounded-full text-xs px-2 py-2 ";

  const styles = {
    primary:
      base +
      "bg-yellow-600 px-5 py-2 text-stone-100 hover:bg-stone-400 hover:text-stone-700 md:text-base",
    secondary:
      base +
      "border-2 border-yellow-700 px-3 text-yellow-700 hover:border-stone-600 hover:bg-stone-400 hover:text-stone-700 md:text-sm",
    small:
      base +
      "bg-blue-600 px-4 py-1 text-xs text-stone-100 hover:bg-stone-400 hover:text-stone-700",
    round:
      base +
      "bg-yellow-600 px-5 py-4 text-stone-100 hover:bg-yellow-500 hover:text-stone-800",
  };

  if (form) {
    return (
      <button form={form} onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
