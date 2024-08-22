import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const BookingDetails = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await bookingService.show(id);
        setBooking(bookingData);
        console.log(bookingData);
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
    <div className="container mt-4">
      <h1 className="mb-4">Booking Details</h1>
      <div className="card p-3">
        <p><strong>Service:</strong> {booking.service.name}</p>
        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        {/* <p><strong>Status:</strong> {booking.status}</p> */}
      </div>
      <button className="btn btn-danger mt-3" onClick={handleRemove}>Remove Booking</button>
    </div>
  );
};

export default BookingDetails;
