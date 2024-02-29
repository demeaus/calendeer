function Button({ children, type = "primary", onClick }) {
  const base =
    "rounded-full bg-yellow-600 px-5 py-2 text-stone-100 hover:bg-yellow-500 hover:text-stone-800 ";

  const styles = {
    primary: base,
    round: base + "px-3 py-4",
    chip: "rounded-md bg-sky-600 px-2 py-1 flex flex-wrap text-stone-100 items-center mb-1 justify-between gap-2",
  };

  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;