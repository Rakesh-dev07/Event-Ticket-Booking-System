import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

import SeatGrid from "../components/SeatGrid";
import ReservationTimer from "../components/ReservationTimer";

function EventDetailsPage() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/${id}`);

      setEvent(res.data.data.event);
      setSeats(res.data.data.seats);
    } catch (error) {
      console.error(error);
      alert("Failed to load event");
    }
  };

  const reserveSeats = async () => {
    try {
      if (!selectedSeats.length) {
        return alert("Please select at least one seat");
      }

      setLoading(true);

      const seatNumbers = selectedSeats.map(
        (seat) => seat.seatNumber
      );

      const res = await api.post("/reserve", {
        eventId: id,
        seatNumbers,
      });

      setReservation(res.data.reservation);

      alert("Seats reserved successfully!");

      await fetchEvent();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Reservation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const confirmBooking = async () => {
    try {
      setLoading(true);

      const res = await api.post("/bookings", {
        reservationId: reservation._id,
      });

      alert(res.data.message);

      setReservation(null);
      setSelectedSeats([]);

      await fetchEvent();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Booking failed"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="flex justify-center items-center py-20">
        <h2 className="text-xl font-semibold">
          Loading Event...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Event Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {event.name}
        </h1>

        <p className="text-gray-600">
          📍 {event.venue}
        </p>

        <p className="text-gray-600 mt-2">
          📅{" "}
          {new Date(
            event.dateTime
          ).toLocaleString()}
        </p>

        <p className="mt-2 font-medium">
          Total Seats: {event.totalSeats}
        </p>
      </div>

      {/* Seat Legend */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <h3 className="font-semibold mb-3">
          Seat Status
        </h3>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-green-500"></div>
            <span>Available</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-yellow-500"></div>
            <span>Reserved</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-red-500"></div>
            <span>Booked</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-500"></div>
            <span>Selected</span>
          </div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Select Your Seats
        </h2>

        <SeatGrid
          seats={seats}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
        />
      </div>

      {/* Selected Seats */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">
          Selected Seats
        </h2>

        {selectedSeats.length ? (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat._id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
              >
                {seat.seatNumber}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No seats selected
          </p>
        )}
      </div>

      {/* Reservation Section */}
      {!reservation ? (
        <button
          onClick={reserveSeats}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {loading
            ? "Reserving..."
            : "Reserve Seats"}
        </button>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <ReservationTimer
            expiresAt={reservation.expiresAt}
          />

          <button
            onClick={confirmBooking}
            disabled={loading}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Booking..."
              : "Confirm Booking"}
          </button>
        </div>
      )}
    </div>
  );
}

export default EventDetailsPage;