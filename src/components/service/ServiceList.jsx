import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as serviceService from "../../services/serviceService";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await serviceService.index();
        setServices(serviceData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Service List</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <Link to={`/services/${service._id}`}>
              <h2>{service.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;