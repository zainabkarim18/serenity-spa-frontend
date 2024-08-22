import React, { useState, useEffect } from 'react';
import * as serviceService from '../../services/serviceService';
import * as serviceBooking from '../../services/bookingService';
import { useParams } from 'react-router-dom';

const BookingForm = (props) => {
const {serviceId} = useParams()
  const [service, setService] = useState([]);
  const [formData, setFormData] = useState({
    user: '',
    service: '',
    date: '',
    time: '',
    status: 'Pending', // Default status
  });


    // const [serviceList, setServiceList] = useState([]);
        useEffect(() => {
            console.log("user",props.userId);
            console.log("service",props.serviceId);
            
        const fetchService = async () => {
            try {
            const service = await serviceService.detail(props.serviceId);
            if (service.error) {  
                throw new Error(service.error);
            }
            setService(service);
            console.log(service);
            
            } catch (err) {
            console.log(err);
        }
        };
        fetchService();

    }, []);

const handleAddBooking = async (formData,userId,serviceId) => {
    console.log("entered");
    console.log("handle add booking",userId);
    console.log("handle add booking",serviceId);
    
    try {
      const newBooking = await serviceBooking.create(formData,userId,serviceId);
      if (!newBooking) {
        throw new Error(newBooking);
      }
      console.log(newBooking);
    //   newBooking([booking, ...newBooking]);
      // console.log("services",services);
      
    //   setIsFormOpen(false);
    } catch (err) {
      console.log("error in booking form",err);
    }
  };



    
//   // Fetch users and services from API
//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         const serviceResponse = await  ;
//         setServices(serviceResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchOptions();
//   }, []);




 const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    // console.log(serviceId);
    
    // console.log(props.user.id);
    await handleAddBooking(formData,props.userId,props.serviceId);
    props.setIsBooking(false);
    
  };

  return (
    <div className="booking-form">
      <h2>Book {service.name} Service</h2>
      <form onSubmit={handleSubmit}>
        {/* <div className="form-group">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* <div className="form-group">
          <label htmlFor="service">Service:</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>
        </div> */}
        <div>
            {/* <h3>{service._id}</h3> */}
            {/* <h4>{service.name}</h4>
            <h4>{service.description}</h4>
            <h4>{service.duration}</h4>
            <h4>{service.price}</h4> */}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
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
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div> */}

        <button type="submit">Submit Booking for {service.name}</button>
      </form>
    </div>
  );
};

export default BookingForm;
