import { HiPlus } from "react-icons/hi";
import EventForm from "./EventForm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

/**
 * Component to open and close modal with form to add event
 */
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
          <EventForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEvent;
