import Seat from "../models/Seat.js";

const cleanupExpiredReservations = () => {
  setInterval(async () => {
    try {
      const now = new Date();

      const result = await Seat.updateMany(
        {
          status: "reserved",
          reservationExpiresAt: { $lt: now },
        },
        {
          $set: {
            status: "available",
            reservationExpiresAt: null,
          },
          $unset: {
            reservedBy: "",
          },
        }
      );

      if (result.modifiedCount > 0) {
        console.log(
          `${result.modifiedCount} expired seats released`
        );
      }
    } catch (error) {
      console.error(error.message);
    }
  }, 60000); // every 1 minute
};

export default cleanupExpiredReservations;