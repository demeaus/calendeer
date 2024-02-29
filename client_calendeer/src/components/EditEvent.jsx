import { HiPencil } from "react-icons/hi";
import Modal from "../ui/Modal";
import CreateEventForm from "./CreateEventForm";

function EditEvent({ event }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="event-form">
          {/* TODO: onClick, the event is editable */}
          <button className="absolute right-1 top-1">
            <HiPencil />
          </button>
        </Modal.Open>
        <Modal.Window name="event-form">
          <CreateEventForm event={event} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditEvent;
