import { HiPencil } from "react-icons/hi";
import Modal from "../ui/Modal";
import EventForm from "./EventForm";

/**
 * Component to open and close modal with form to edit event
 */
function EditEvent({ event }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="event-form">
          <button className="absolute right-5 top-5">
            <HiPencil />
          </button>
        </Modal.Open>
        <Modal.Window name="event-form">
          <EventForm event={event} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditEvent;
