import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingData = await bookingService.index();
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  if (!bookings.length) return <p>No bookings found.</p>;

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <Link to={`/bookings/${booking._id}`}>
             Appointment on {new Date(booking.date).toLocaleDateString()} at {booking.time}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
