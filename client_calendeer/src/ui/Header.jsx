import { HiPlus } from "react-icons/hi";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import Modal from "./Modal";
import CreateEventForm from "../components/CreateEventForm";
import Logo from "./Logo";

function Header() {
  return (
    <div className="flex items-center justify-between bg-stone-300 px-4 py-2">
      <Logo />
      <div className="flex items-center justify-between gap-2">
        <Button>Day</Button>
        <Button>Week</Button>
        <Modal>
          <Modal.Open opens="event-form">
            <ButtonIcon>
              <HiPlus />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name="event-form">
            <CreateEventForm />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}

export default Header;
