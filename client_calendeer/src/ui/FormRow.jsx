export function FormRow({ children, label, error }) {
  return (
    <div className="flex items-center justify-end gap-3 px-2 py-1 text-sm font-medium">
      <label className="" htmlFor={children.props.id}>
        {label}
      </label>
      <div>
        {children}
        <span>{error}</span>
      </div>
    </div>
  );
}
