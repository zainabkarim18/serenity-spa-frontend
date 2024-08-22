import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="service">
      <div className="title">
        <h2>Our Services</h2>
      </div>
      <div className="box">
        {services.map((service) => (
          <div className="cardservice" key={service._id}>
            
            <img src={service.image} alt={service.name} /><br /><br />
            <h5>{service.name}</h5><br />
            <div className="pra">
              <p style={{ textAlign: "center" }}>
                <Link to={`/services/${service._id}`} className="booking-button">More</Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceList;













