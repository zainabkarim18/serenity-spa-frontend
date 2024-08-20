import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import * as serviceService from "../../services/serviceService";

// Components
import Reviews from "../review/reviewSection"; 

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    async function getService() {
      const serviceData = await serviceService.detail(id);
      setService(serviceData);
    }
    getService();
  }, [id]);
// return if selected is null
  if (!service)
    return (
      <div>
        <h1>NO DETAILS</h1>
      </div>
    );

  return (
    <div>
      <h1>Name: {service.name}</h1>
      <h2>Description: {service.description}</h2>
      <h2>Duration: {service.duration}</h2>
      <h2>
        Price: {service.price}
        {service.price > 1 ? "BD" : ""}
      </h2>

      <Reviews serviceId={id} /> 
    </div>
  );
};

export default ServiceDetail;
