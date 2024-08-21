import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [showBookingForm, setshowBookingForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchBookings();
    const user = authService.getUser();
    setCurrentUser(user);
  }, []);

   const fetchBookings = async () => {
      try {
        const bookingData = await bookingService.index();
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

  // const addBooking = async (booking)=>{
  //   try {
  //     const createBooking = await bookingService.create(booking);
  //     fetchBookings();
  //   } catch (error) {
  //       console.log("Error creating booking:", error);
  //   }
  // }
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
