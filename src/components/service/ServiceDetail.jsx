import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
// import * as serviceService from "../../services/serviceService";

// Components
// import Reviews from "../review/reviewSection"; 

export default function ServiceDetail (props) {
//   const { id } = useParams();
//   const [service, setService] = useState(null);
// const ser = props._id
  // useEffect(() => {
  //   async function getService() {
  //     const serviceData = await serviceService.detail(props._id);
  //     setService(serviceData);
  //   }
  //   getService();
  // }, [id]);

   const editService =()=>{
    props.setIsEdit();
    props.setServiceToEdit(props._id)
    }

    //  const handleDeleteService =()=>{
    // props.handleDeleteService(props._id)
   
    //  }

  // const handleEditService = (service) => {
  //   setIsFormOpen(true);;
  //   setService(service);
  // };


  // const handleDeleteService = async (id) => {
  //   try {
  //     //
  //   } catch (error) {
  //     console.log(error);
  //   };
  // };
// return if selected is null
  // if (!service)
  //   return (
  //     <div>
  //       <h1>NO DETAILS</h1>
  //     </div>
  //   );


  return (
    <div>


      <h1>Name: {props.name}</h1>
      <h2>Description: {props.description}</h2>
      <h2>Duration: {props.duration}</h2>
      <h2>
        Price: {props.price}
        {props.price > 1 ? "BD" : ""}
      </h2> 
      {/* <button onClick={() => handleEditService(service)}>Edit Service</button> */}
      <button  onClick={()=>editService()}>Edit Service</button>
      <button  onClick={() => props.handleDeleteService(props._id)}> Delete Service</button>
    
         {/* <button onClick={() => handleDeleteService(service._id)}>Delete Track</button> */}
      
      {/* <Reviews serviceId={id} />  */}
    </div>
  );
};

