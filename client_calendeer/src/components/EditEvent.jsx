import { HiPencil } from "react-icons/hi";
import Modal from "../ui/Modal";
import EventForm from "./EventForm";

function EditEvent({ event }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="event-form">
          <button className="absolute right-3 top-3 md:relative md:right-0 md:top-0 md:items-center">
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
