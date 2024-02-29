export function FormRow({ children, label, error }) {
  return (
    <div className="grid items-center">
      <label className="text-sm" htmlFor={children.props.id}>
        {label}
      </label>
      {children}
      <span>{error}</span>
    </div>
  );
}
