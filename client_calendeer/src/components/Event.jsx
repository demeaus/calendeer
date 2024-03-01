import { formatDate } from "../utils/helpers";
import EditEvent from "./EditEvent";

function Event({ event }) {
  const {
    eventName,
    host,
    invitees,
    description,
    datetime_start,
    datetime_end,
  } = event;

  // Formats datetime string for display
  const { date: start_date, time: start_time } = formatDate(datetime_start);
  const { date: end_date, time: end_time } = formatDate(datetime_end);

  return (
    <div className="relative h-fit rounded-md border-2 bg-blue-700 px-4 py-2 text-stone-100">
      <h1 className="">{eventName}</h1>
      <h2 className="text-sm">
        {start_time} to {end_time}
      </h2>
      <h2>{start_date}</h2>
      {/* TODO: Remove details */}
      <div>
        <p>{host}</p>
        <p>{invitees}</p>
      </div>
      <EditEvent event={event} />
    </div>
  );
}

export default Event;
