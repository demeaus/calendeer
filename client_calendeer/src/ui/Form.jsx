function Form({ children, id, onSubmit }) {
  return (
    <form id={id} onSubmit={onSubmit} className="flex flex-col gap-2">
      {children}
    </form>
  );
}

export default Form;
