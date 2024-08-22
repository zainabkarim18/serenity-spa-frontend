import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as bookingService from '../../services/bookingService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import authService from "../../services/authService";

const BookingList = (props) => {
  const {userId} = useParams()
  const [bookings, setBookings] = useState([]);
  const [showBookingForm, setshowBookingForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    console.log("user",props.user);
    
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
    <div className="container mt-4">
      {(props.user && props.user.role =="admin") ? <h2 className="mb-4">All Bookings</h2>:<h2 className="mb-4">Your Bookings</h2>}
      <ul className="list-group">
        {bookings.map((booking) => (
          <li key={booking._id} className="list-group-item">
{  booking.service &&          <Link className='link' to={`/bookings/${booking._id}`}>
             on {new Date(booking.date).toLocaleDateString()} at {booking.time}
              <p><strong>Service:</strong> {booking.service && booking.service.name}</p>
            
            </Link>}
          </li>
        ))}
        
      </ul>
    </div>
  );
};

export default BookingList;
