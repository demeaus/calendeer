// TODO: refactor input elements
function Input({ children, type }) {
  const base =
    "items-center rounded-lg border-2 border-stone-400 bg-stone-200 ";
  const styles = {
    text: base + "min-h-10 min-w-56 px-3 py-2",
    area: base + "",
  };
  return <input className={styles[type]}>{children}</input>;
}

export default Input;
