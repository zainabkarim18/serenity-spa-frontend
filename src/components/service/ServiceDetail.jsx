import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as serviceService from "../../services/serviceService";

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

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
      <h1>{service.name}</h1>
      <p>Description: {service.description}</p>
      <p>Duration: {service.duration}</p>
      <p>Price: {service.price}</p>
      {service.image && (
        <p>
          Image: <img src={service.image} alt={service.name} />
        </p>
      )}
      <Link to={`/services/edit`}>
        <button>Edit Service</button>
      </Link>
      <button onClick={handleDelete}>Delete Service</button>
    </div>
  );
};

export default ServiceDetail;