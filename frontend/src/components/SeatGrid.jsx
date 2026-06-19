import Seat from "./Seat";

function SeatGrid({
  seats,
  selectedSeats,
  setSelectedSeats,
}) {
  const handleSelect = (seat) => {
    const exists = selectedSeats.find(
      (s) => s._id === seat._id
    );

    if (exists) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) => s._id !== seat._id
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);
    }
  };

  const sortedSeats = [...seats].sort(
    (a, b) => {
      const rowA = a.seatNumber[0];
      const rowB = b.seatNumber[0];

      if (rowA !== rowB) {
        return rowA.localeCompare(rowB);
      }

      const numA = parseInt(
        a.seatNumber.slice(1)
      );
      const numB = parseInt(
        b.seatNumber.slice(1)
      );

      return numA - numB;
    }
  );

  return (
    <div
      className="
        grid
        grid-cols-3
        sm:grid-cols-4
        md:grid-cols-6
        lg:grid-cols-10
        gap-2
      "
    >
      {sortedSeats.map((seat) => (
        <Seat
          key={seat._id}
          seat={seat}
          onSelect={handleSelect}
          isSelected={selectedSeats.some(
            (s) => s._id === seat._id
          )}
        />
      ))}
    </div>
  );
}

export default SeatGrid;