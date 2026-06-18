function Seat({ seat, onSelect, isSelected }) {
  let backgroundColor = "#22c55e"; // available

  if (seat.status === "reserved") {
    backgroundColor = "#eab308";
  }

  if (seat.status === "booked") {
    backgroundColor = "#ef4444";
  }

  if (isSelected) {
    backgroundColor = "#3b82f6";
  }

  return (
    <button
      disabled={seat.status !== "available"}
      onClick={() => onSelect(seat)}
      style={{
        width: "60px",
        height: "60px",
        margin: "5px",
        border: "none",
        borderRadius: "8px",
        cursor:
          seat.status === "available"
            ? "pointer"
            : "not-allowed",
        backgroundColor,
        color: "white",
        fontWeight: "bold",
      }}
    >
      {seat.seatNumber}
    </button>
  );
}

export default Seat;