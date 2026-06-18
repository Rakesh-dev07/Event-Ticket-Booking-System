import mongoose from "mongoose";
import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

export const reserveSeats = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
  const { eventId, seatNumbers } = req.body;

  const userId = req.user._id;

  if (!seatNumbers?.length) {
    return res.status(400).json({
      success: false,
      message: "No seats selected",
    });
  }

    const seats = await Seat.find({
      eventId,
      seatNumber: { $in: seatNumbers },
      status: "available",
    }).session(session);

    if (seats.length !== seatNumbers.length) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "One or more seats unavailable",
      });
    }

    const expiresAt = new Date(
      Date.now() + 2 * 60 * 1000
    );

    await Seat.updateMany(
      {
        eventId,
        seatNumber: { $in: seatNumbers },
      },
      {
        $set: {
          status: "reserved",
          reservedBy: userId,
          reservationExpiresAt: expiresAt,
        },
      },
      { session }
    );

    const reservation = await Reservation.create(
      [
        {
          userId,
          eventId,
          seatNumbers,
          expiresAt,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      reservation: reservation[0],
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