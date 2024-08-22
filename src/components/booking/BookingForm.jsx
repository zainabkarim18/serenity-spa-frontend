import React, { useState, useEffect } from 'react';
import * as serviceService from '../../services/serviceService';
import * as serviceBooking from '../../services/bookingService';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingForm = (props) => {
  const { serviceId } = useParams();
  const [service, setService] = useState({});
  const [formData, setFormData] = useState({
    user: '',
    service: '',
    date: '',
    time: '',
    status: 'Pending', // Default status
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetchedService = await serviceService.detail(props.serviceId);
        if (fetchedService.error) {
          throw new Error(fetchedService.error);
        }
        setService(fetchedService);
      } catch (err) {
        console.error(err);
      }
    };
    fetchService();
  }, [props.serviceId]);

  const handleAddBooking = async (formData, userId, serviceId) => {
    try {
      const newBooking = await serviceBooking.create(formData, userId, serviceId);
      if (!newBooking) {
        throw new Error(newBooking);
      }
      console.log(newBooking);
    } catch (err) {
      console.error("Error in booking form", err);
    }
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleAddBooking(formData, props.userId, props.serviceId);
    props.setIsBooking(false);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Book {service.name} Service</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                className="form-control"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Booking for {service.name}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
