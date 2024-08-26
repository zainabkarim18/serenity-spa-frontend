import { useParams, useNavigate, Link } from "react-router-dom";
import Reviews from "../review/reviewSection";
import * as serviceService from "../../services/serviceService";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import authService from "../../services/authService";
import BookingForm from '../booking/BookingForm';

const ServiceDetail = (props) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isBooking,setIsBooking] = useState(false);
  

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        const serviceData = await serviceService.detail(id); 
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchServiceDetail();
    const user = authService.getUser();
    setCurrentUser(props.user);
    // if(currentUser)
    //   console.log("currentUser",currentUser);
      
  }, [id]);

  const handleDelete = async () => {
    try {
      await serviceService.remove(id);
      navigate("/services");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <>
      <div className="container">
        <h1 className="my-4">{service.name}</h1>
        <div className="card mb-4">
          <div className="card-body">
            <p className="card-text"><strong>Description:</strong> {service.description}</p>
            <p className="card-text"><strong>Duration:</strong> {service.duration}</p>
            <p className="card-text"><strong>Price:</strong> {service.price}</p>
            {service.image && (
              <div className="mb-3">
                <img src={service.image} alt={service.name} className="img-fluid" />
              </div>
            )}
            <div className="d-flex justify-content-start">
              {(props.user && props.user.role=="admin")?<div><Link to={`/services/${service._id}/edit`} className="btn btn-warning me-2">
                Edit Service
              </Link>
              <button onClick={handleDelete} className="btn btn-danger me-2">
                Delete Service
              </button></div>:""}
                {(props.user && props.user.role!="admin")?<button onClick={()=> setIsBooking(!isBooking)} className="btn btn-danger me-2">
                Book Service
              </button>:""}
            </div> 
          </div>
        </div>
        { (currentUser && isBooking) ? (<BookingForm userId={currentUser.id} serviceId={id} setIsBooking={setIsBooking} isBooking={isBooking}/> ):"" }
      </div>
      <Reviews serviceId={id} />
    </>
  );  
};


export default ServiceDetail;
