import { useEvents } from "../hooks/useEvents";
import Event from "./Event";

// Event Data for the next 24 hours
const tempEventData = [
  {
    id: 1,
    eventName: "Meeting A",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 11, 12, 0),
    datetime_end: new Date(2024, 2, 11, 12, 30),
    invitees: ["b@g.com", "deerdra@g.com"],
  },
  {
    id: 2,
    eventName: "Meeting B",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 11, 14, 0),
    datetime_end: new Date(2024, 2, 11, 14, 30),
    invitees: ["d@g.com", "e@g.com", "ffdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 3,
    eventName: "Meeting C",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 11, 10, 0),
    datetime_end: new Date(2024, 2, 11, 12, 0),
    invitees: ["d@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 4,
    eventName: "Meeting D",
    host: "j@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 11, 8, 0),
    datetime_end: new Date(2024, 2, 11, 9, 0),
    invitees: ["b@g.com", "f@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 5,
    eventName: "Meeting E",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 12, 12, 0),
    datetime_end: new Date(2024, 2, 12, 12, 30),
    invitees: ["x@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 6,
    eventName: "Meeting F",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 11, 14, 0),
    datetime_end: new Date(2024, 2, 11, 14, 30),
    invitees: ["z@g.com", "b@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 7,
    eventName: "Meeting G",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 10, 10, 0),
    datetime_end: new Date(2024, 2, 10, 12, 0),
    invitees: ["r@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
  {
    id: 8,
    eventName: "Meeting H",
    host: "a@g.com",
    description: "",
    datetime_start: new Date(2024, 2, 12, 8, 0),
    datetime_end: new Date(2024, 2, 12, 9, 0),
    invitees: ["x@g.com", "cfdsfdsafdasaffdsadf@g.com"],
  },
];

function Day() {
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
      {events &&
        events
          .sort(sortByDate)
          .map((event) => (
            <Event key={`${event.id}-${event.eventName}`} event={event} />
          ))}
    </div>
  );
}

export default Day;
