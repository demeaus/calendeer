import { useEvents } from "../hooks/useEvents";
import Divider from "../ui/Divider";
import Event from "./Event";

/**
 * Component represents all events on a user's schedule
 */
function View() {
  const { isLoading, events = null, error } = useEvents();

  const now = new Date();
  const beginHour = now.getHours();
  const endHour = (beginHour + 24) % 14;

  function sortByDate(a, b) {
    const dateA = a.datetime_start;
    const dateB = b.datetime_start;
    return dateA - dateB;
  }

  return (
    <div className="w-100% flex h-screen flex-col p-2 ">
      <Divider date={new Date().toTimeString()} />
      {events &&
        events
          .sort(sortByDate)
          .map((event) => (
            <Event key={`${event.id}-${event.eventName}`} event={event} />
          ))}
    </div>
  );
}

export default View;
