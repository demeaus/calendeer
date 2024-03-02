export function FormRow({ children, label, error }) {
  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center justify-end gap-3 px-2 py-1 text-sm font-medium">
        <label htmlFor={children.props.id}>{label}</label>
        <div className="">{children}</div>
      </div>
      {error && (
        <span className="mb-3 w-fit rounded-md text-xs text-red-700">
          {error}
        </span>
      )}
    </div>
  );
}
