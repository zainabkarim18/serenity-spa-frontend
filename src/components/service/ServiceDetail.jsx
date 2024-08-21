import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as serviceService from "../../services/serviceService";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

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
  }, [id]);

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>Description: {service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: {service.price}</p>
    </div>
  );
};

export default ServiceDetail;
