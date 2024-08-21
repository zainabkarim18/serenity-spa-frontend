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
      <img src={props.image} alt={props.name} />
      <h1>{props.name}</h1>
      <h2>Description: {props.description}</h2>
      <h2>Duration: {props.duration}</h2>
      <h2>
        Price: {props.price}
        {props.price > 1 ? "BD" : ""}
      </h2> 
      <button  onClick={()=>editService()}>Edit Service</button>
      <button  onClick={() => props.handleDeleteService(props._id)}> Delete Service</button>
    
      
      <Reviews serviceId={props._id} /> 
    </div>
  );
};

export default ServiceDetail;
