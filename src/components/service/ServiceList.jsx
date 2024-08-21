import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as serviceService from "../../services/serviceService";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container">
      <h1 className="my-4">Service List</h1>
      <Link to="/services/new" className="btn btn-primary mb-4">
        Add Service
      </Link>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card h-100">
              <img src={service.image} className="card-img-top" alt={service.name} />
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <Link to={`/services/${service._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
