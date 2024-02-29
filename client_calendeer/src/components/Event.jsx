import { formatDate } from "../utils/helpers";

function Event({ event }) {
  const { name, description, datetime_start, datetime_end } = event;
  const { date: start_date, time: start_time } = formatDate(datetime_start);
  const { date: end_date, time: end_time } = formatDate(datetime_end);
  return (
    <div className="rounded-md border-2 bg-sky-700 px-3 py-1 text-stone-100 ">
      <div>{name}</div>
      {/* {start_date !== end_date && (
        <h2>
          {start_date} to {end_date}
        </h2>
      )} */}
      <h2>{start_date}</h2>
      <h2>
        {start_time} to {end_time}
      </h2>
    </div>
  );
}

export default Event;
