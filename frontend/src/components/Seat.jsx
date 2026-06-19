function Seat({
  seat,
  onSelect,
  isSelected,
}) {
  let color = "bg-green-500";

  if (seat.status === "reserved")
    color = "bg-yellow-500";

  if (seat.status === "booked")
    color = "bg-red-500";

  if (isSelected)
    color = "bg-blue-500";

  return (
    <button
      disabled={
        seat.status !== "available"
      }
      onClick={() => onSelect(seat)}
      className={`
        ${color}
        h-16
        w-full
        rounded-lg
        text-white
        font-semibold
        transition
        hover:scale-105
        disabled:cursor-not-allowed
      `}
    >
      {seat.seatNumber}
    </button>
  );
}

export default Seat;