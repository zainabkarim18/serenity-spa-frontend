import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import * as serviceService from '../../services/serviceService';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

       useEffect(()=>{
    async function getService(){
      const serviceData = await serviceService.detail(id)
      setService(serviceData)
    }
    getService()
  },[id])
  // return if selected is null
  if (!service)
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );

  return (
    // return statement if selected has a truthy value
    <div>
      <h1>Name: {service.name}</h1>
      <h2>description: {service.description}</h2>
      <h2>duration: {service.duration} </h2> 
      <h2>
        price: {service.price}{service.price > 1 ? 'BD' : ''} 
      </h2>
    </div>
  );
};

export default ServiceDetail;
