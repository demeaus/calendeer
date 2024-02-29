import { HiPlus } from "react-icons/hi";
import CreateEventForm from "./CreateEventForm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

function AddEvent() {
  return (
    <div className="fixed bottom-5 right-5">
      <Modal>
        <Modal.Open opens="event-form">
          <Button type="round">
            <HiPlus />
          </Button>
        </Modal.Open>
        <Modal.Window name="event-form">
          <CreateEventForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEvent;
