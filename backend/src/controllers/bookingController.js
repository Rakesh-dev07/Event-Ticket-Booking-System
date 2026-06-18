import mongoose from "mongoose";
import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

export const confirmBooking = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { reservationId } = req.body;

    const reservation = await Reservation.findById(
      reservationId
    ).session(session);

    if (!reservation) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (new Date() > reservation.expiresAt) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Reservation expired",
      });
    }

    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: {
          $in: reservation.seatNumbers,
        },
      },
      {
        $set: {
          status: "booked",
          reservationExpiresAt: null,
        },
        $unset: {
          reservedBy: "",
        },
      },
      { session }
    );

    await Reservation.findByIdAndDelete(
      reservationId,
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Booking confirmed",
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};