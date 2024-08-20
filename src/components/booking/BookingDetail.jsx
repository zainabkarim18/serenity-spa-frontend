import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await bookingService.show(id);
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBooking();
  }, [id]);

  const handleRemove = async () => {
    try {
      await bookingService.remove(id);
      navigate('/bookings'); 
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };

  if (!booking) return <p>Loading...</p>;

  return (
    <div>
      <h1>Booking Details</h1>
      <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p>Time: {booking.time}</p>
      <p>Status: {booking.status}</p>

      <button onClick={handleRemove}>Remove Booking</button>
    </div>
  );
};

export default BookingDetails;
