import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import authService from "../../services/authService";
import BookingForm from '../booking/BookingForm';

export default function ServiceDetail (props) {
      const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isBooking,setIsBooking] = useState(false);
  

  const editService =()=>{
    props.setIsEdit();
    props.setServiceToEdit(props._id)
    }

    useEffect(() => {
    const user = authService.getUser();
    setCurrentUser(user);
    if(currentUser)
    console.log("user",currentUser);
    
  }, []);

  return (
    <div>

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
    


      
      {/* <Reviews serviceId={id} />  */}
    </div>
  );
};

