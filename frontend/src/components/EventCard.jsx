import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-5">
      <h2 className="text-xl font-bold mb-2">
        {event.name}
      </h2>

      <p className="text-gray-600">
        {event.venue}
      </p>

      <p className="mt-2 text-sm">
        {new Date(
          event.dateTime
        ).toLocaleString()}
      </p>

      <Link
        to={`/events/${event._id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Seats
      </Link>
    </div>
  );
}

export default EventCard;