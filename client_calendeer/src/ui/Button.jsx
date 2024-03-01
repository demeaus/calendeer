// TODO: refactor; add danger button
function Button({ children, type = "primary", form, onClick }) {
  const base = "text-xs px-2 py-1 ";

  const styles = {
    primary:
      base +
      "rounded-full px-5 py-2 bg-yellow-600 text-stone-100 hover:bg-stone-400 hover:text-stone-700 md:text-base",
    secondary:
      base +
      "rounded-full px-4 py-2 border-yellow-700 text-yellow-700 border-2 hover:bg-stone-400 hover:text-stone-700 hover:border-stone-600 md:text-sm",
    small:
      base +
      "rounded-full px-4 py-1 bg-blue-600 text-stone-100 hover:bg-stone-400 hover:text-stone-700 text-xs",
    round:
      base +
      "rounded-full px-5 py-2 bg-yellow-600 text-stone-100 hover:bg-yellow-500 hover:text-stone-800 px-3 py-4",
    chip: "rounded-md bg-blue-600 px-2 py-1 flex flex-wrap text-stone-100 items-center mb-1 justify-between gap-2",
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
