import { formatDate } from "../utils/helpers";
import EditEvent from "./EditEvent";

/**
 * Component represents an event
 */
// TODO: Provide user option to view event details as read-only
function Event({ event }) {
  const { eventName, datetime_start, datetime_end } = event;

  // Formats datetime string for display
  const { date: start_date, time: start_time } = formatDate(datetime_start);
  const { date: end_date, time: end_time } = formatDate(datetime_end);

  return (
    <div className="relative h-fit rounded-md border-2 bg-blue-700 px-6 pb-4 pt-3 text-stone-100">
      <h1 className="mb-2 text-lg">{eventName}</h1>
      <h2 className="text-base">{start_date}</h2>
      {/* TODO: Handle events spanning multiple days */}
      <h2 className="text-sm">
        {start_time} to {end_time}
      </h2>
      <EditEvent event={event} />
    </div>
  );
}

export default Event;
