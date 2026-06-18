import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import cleanupExpiredReservations from "./utils/cleanupExpiredReservations.js";

dotenv.config();

connectDB();

cleanupExpiredReservations();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});