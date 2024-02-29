import Event from "./Event";

// Event Data for the next 24 hours
const eventData = [
  {
    id: 1,
    name: "Meeting A",
    description: "",
    datetime_start: new Date(2024, 2, 11, 12, 0),
    datetime_end: new Date(2024, 2, 11, 12, 30),
  },
  {
    id: 2,
    name: "Meeting B",
    description: "",
    datetime_start: new Date(2024, 2, 11, 14, 0),
    datetime_end: new Date(2024, 2, 11, 14, 30),
  },
  {
    id: 3,
    name: "Meeting C",
    description: "",
    datetime_start: new Date(2024, 2, 11, 10, 0),
    datetime_end: new Date(2024, 2, 11, 12, 0),
  },
  {
    id: 4,
    name: "Meeting D",
    description: "",
    datetime_start: new Date(2024, 2, 11, 8, 0),
    datetime_end: new Date(2024, 2, 11, 9, 0),
  },
  {
    id: 5,
    name: "Meeting E",
    description: "",
    datetime_start: new Date(2024, 2, 12, 12, 0),
    datetime_end: new Date(2024, 2, 12, 12, 30),
  },
  {
    id: 6,
    name: "Meeting F",
    description: "",
    datetime_start: new Date(2024, 2, 11, 14, 0),
    datetime_end: new Date(2024, 2, 11, 14, 30),
  },
  {
    id: 7,
    name: "Meeting G",
    description: "",
    datetime_start: new Date(2024, 2, 10, 10, 0),
    datetime_end: new Date(2024, 2, 10, 12, 0),
  },
  {
    id: 8,
    name: "Meeting H",
    description: "",
    datetime_start: new Date(2024, 2, 12, 8, 0),
    datetime_end: new Date(2024, 2, 12, 9, 0),
  },
];

function Day() {
  const now = new Date();
  const beginHour = now.getHours();
  const endHour = (beginHour + 24) % 14;

  function sortByDate(a, b) {
    const dateA = a.datetime_start;
    const dateB = b.datetime_start;
    return dateA - dateB;
  }

  return (
    <div className="flex h-screen p-2">
      {/* <div className="grid-rows-24 grid">
        <p className="row-start-1">{beginHour}:00</p>
        <p className="row-start-24">{endHour}:00</p>
      </div> */}
      <div className="grid-rows-24 grid">
        {eventData.sort(sortByDate).map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Day;
