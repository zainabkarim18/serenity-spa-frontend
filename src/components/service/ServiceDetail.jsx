import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as serviceService from "../../services/serviceService";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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
    setCurrentUser(user);
    if(currentUser)
    console.log("user",currentUser);
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
    <div>

      <img src={props.image} alt={props.name} />
      <h1>Name: {props.name}</h1>
      <h2>Description: {props.description}</h2>
      <h2>Duration: {props.duration}</h2>
      <h2>
        Price: {props.price}
        {props.price > 1 ? "BD" : ""}
      </h2> 
      <button  onClick={()=>editService()}>Edit Service</button>
      <button  onClick={() => props.handleDeleteService(props._id)}> Delete Service</button>
      <button onClick={()=> setIsBooking(!isBooking)}>BOOK</button>
      { currentUser && isBooking && <BookingForm userId={currentUser.id} serviceId={props._id} />}
    


      
      <Reviews serviceId={props._id} /> 
    </div>
  );
};

export default ServiceDetail;
