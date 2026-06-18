# Event Ticket Booking System

A full-stack MERN application for event ticket booking with seat reservation, booking confirmation, reservation expiry handling, and JWT-based authentication.

Built as part of a Full Stack Developer (MERN) Hiring Assignment.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Event Management

- View all available events
- View event details
- View seat availability for each event

### Seat Reservation

- Select multiple seats
- Reserve seats for 10 minutes
- Reservation countdown timer
- Automatic reservation expiry handling

### Booking

- Confirm reserved seats
- Convert reserved seats to booked seats
- Prevent booking expired reservations

### Concurrency Handling

- Prevent double booking
- MongoDB transactions used for atomic seat reservation and booking operations

---

## Tech Stack

### Frontend

- React
- React Router DOM
- Axios
- Tailwind CSS
- React Hooks (useState, useEffect)

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

### Backend

```bash
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

### Frontend

```bash
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/event-booking-system.git

cd event-booking-system
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Seed Sample Data

To populate sample events and seats:

```bash
npm run seed
```

This creates:

- Sample Events
- Row A Seats (A1-A25)
- Row B Seats (B1-B25)

for each event.

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Events

### Get All Events

```http
GET /api/events
```

### Get Event Details

```http
GET /api/events/:id
```

---

## Reservation

### Reserve Seats

```http
POST /api/reserve
```

Request:

```json
{
  "eventId": "eventId",
  "seatNumbers": ["A1", "A2"]
}
```

---

## Booking

### Confirm Booking

```http
POST /api/bookings
```

Request:

```json
{
  "reservationId": "reservationId"
}
```

---

# Application Flow

1. User registers or logs in
2. User views available events
3. User selects an event
4. Seat grid is displayed with seat status indicators
5. User selects one or more available seats
6. User reserves selected seats
7. Reservation countdown timer starts
8. User confirms booking
9. Seats are permanently marked as booked

---

# Design Decisions

## Preventing Double Booking

To prevent multiple users from reserving or booking the same seat:

- MongoDB transactions are used during reservation and booking operations.
- Seat availability is checked before reservation.
- Seat status updates occur atomically inside a transaction.
- If any requested seat is unavailable, the transaction is rolled back.

This ensures consistency even when multiple users attempt to reserve the same seat simultaneously.

---

## Reservation Expiry

Each reservation contains an:

```js
expiresAt
```

timestamp.

Reserved seats are automatically released after expiration.

A cleanup service periodically:

- Finds expired reservations
- Releases reserved seats
- Marks them as available again

---

## Authentication

JWT authentication is implemented.

Protected endpoints:

```http
POST /api/reserve
POST /api/bookings
```

User identity is extracted from the JWT token instead of trusting client-provided user IDs.

---

# Assumptions

- Events and seats are pre-seeded using a seed script.
- Reservation duration is set to 10 minutes.
- A user can reserve multiple seats in a single reservation.
- Seat numbers are unique within an event.
- Sample event data is used for demonstration and testing purposes.

---

# Key Technical Expectations Covered

✅ Effective State Management using React Hooks

✅ Component-Based Architecture

✅ Asynchronous API Handling using Axios

✅ Error Handling and Validation

✅ Basic User Authentication

✅ MongoDB Transactions

✅ Reservation Expiry Logic

✅ Double Booking Prevention

✅ Responsive User Interface

---

# Future Improvements

- Real-time seat updates using WebSockets
- Email booking confirmations
- User booking history
- Admin dashboard for event management
- Payment gateway integration

---
<!--

# Screenshots

Add screenshots here before submission:

### Login Page

![Login](./screenshots/login.png)

### Events Page

![Events](./screenshots/events.png)

### Seat Selection

![Seat Selection](./screenshots/seats.png)

### Booking Confirmation

![Booking](./screenshots/booking.png)

---

# Author

Developed as part of a MERN Full Stack Developer Hiring Assignment. -->