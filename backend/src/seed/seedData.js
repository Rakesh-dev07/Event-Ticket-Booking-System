import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "../config/db.js";
import Event from "../models/Event.js";
import Seat from "../models/Seat.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Event.deleteMany();
    await Seat.deleteMany();

    const events = await Event.insertMany([
      {
        name: "Coldplay Live",
        venue: "Mumbai Stadium",
        dateTime: new Date("2025-08-15T18:00:00"),
        totalSeats: 50,
      },
      {
        name: "Arijit Singh Concert",
        venue: "Delhi Arena",
        dateTime: new Date("2025-09-10T19:00:00"),
        totalSeats: 50,
      },
      {
        name: "Standup Night",
        venue: "Bangalore Hall",
        dateTime: new Date("2025-10-01T20:00:00"),
        totalSeats: 50,
      },
    ]);

    for (const event of events) {
      const seats = [];

      for (let i = 1; i <= 25; i++) {
        seats.push({
          eventId: event._id,
          seatNumber: `A${i}`,
        });
      }

      for (let i = 1; i <= 25; i++) {
        seats.push({
          eventId: event._id,
          seatNumber: `B${i}`,
        });
      }

      await Seat.insertMany(seats);
    }

    console.log("Seed Data Inserted");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
