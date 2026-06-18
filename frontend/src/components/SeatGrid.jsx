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

  return (
    <div>
      {seats.map((seat) => (
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