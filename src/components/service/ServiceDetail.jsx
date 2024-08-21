import { useParams, useNavigate, Link } from "react-router-dom";
import * as serviceService from "../../services/serviceService";
import React, { useState, useEffect } from "react";
import authService from "../../services/authService";
import BookingForm from '../booking/BookingForm';
import Reviews from "../review/reviewSection";

const ServiceDetail = (props) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
  const [isBooking,setIsBooking] = useState(false);
  

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const serviceData = await serviceService.detail(props.id);
        console.log("service id:",props.id);
        
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchServiceDetail();
    const user = authService.getUser();
    setCurrentUser(user);
    if(currentUser)
    console.log("user",currentUser);
  }, [id]);

  const handleDelete = async () => {
    try {
      await serviceService.remove(props.id);
      navigate("/services");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>Description: {service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: {service.price}</p>
      {service.image && (
        <p>
          Image: <img src={service.image} alt={service.name} />
        </p>
      )}
      <Link to={`/services/edit`}>
        <button>Edit Service</button>
      </Link>
      <button onClick={handleDelete}>Delete Service</button>
      <button onClick={()=> setIsBooking(!isBooking)}>BOOK</button>
      { currentUser && isBooking && <BookingForm userId={currentUser.id} serviceId={props._id} />}
    </div>
  );
};

export default ServiceDetail;