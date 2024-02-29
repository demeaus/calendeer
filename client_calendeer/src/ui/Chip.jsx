import { HiX } from "react-icons/hi";
import Button from "./Button";

function Chip({ email, onClick }) {
  return (
    <Button type="chip" onClick={() => onClick(email)}>
      {email}
      <HiX />
    </Button>
  );
}

export default Chip;
