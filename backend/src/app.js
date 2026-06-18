import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://event-ticket-booking-system-eight.vercel.app",
    ],
  })
);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Event Booking API Running"
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/reserve", reservationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

//test route to create an event
import Event from "./models/Event.js";
app.get("/test", async (req, res) => {
  const event = await Event.create({
    name: "Coldplay Live",
    venue: "Mumbai Stadium",
    dateTime: new Date(),
    totalSeats: 100,
  });

  res.json(event);
});

export default app;