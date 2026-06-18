import { useEffect, useState } from "react";

function ReservationTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const difference =
        new Date(expiresAt) - new Date();

      if (difference <= 0) {
        setTimeLeft("Expired");
        clearInterval(timer);
        return;
      }

      const minutes = Math.floor(
        difference / 1000 / 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  return (
    <h2>
      Reservation Expires In: {timeLeft}
    </h2>
  );
}

export default ReservationTimer;