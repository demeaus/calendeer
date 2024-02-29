import { formatDate } from "../utils/helpers";

function Event({ event }) {
  const { name, description, datetime_start, datetime_end } = event;
  return (
    <div className="rounded-md border-2 bg-sky-700 px-3 py-1 text-stone-100 ">
      <div>{name}</div>
      <h2>
        {formatDate(datetime_start)} to {formatDate(datetime_end)}
      </h2>
    </div>
  );
}

export default Event;
