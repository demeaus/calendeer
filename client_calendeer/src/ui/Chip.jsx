import { HiX } from "react-icons/hi";

/**
 * Component that represents an invited user; can be removed by being clicked
 */
function Chip({ email, onClick }) {
  return (
    <button
      className="mb-1 flex flex-wrap items-center justify-between gap-2 rounded-md bg-blue-600 px-2 py-1 text-stone-100"
      onClick={() => onClick(email)}
    >
      {email} <HiX />
    </button>
  );
}

export default Chip;
