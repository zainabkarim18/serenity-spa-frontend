import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import * as serviceService from "../../services/serviceService";
import ServiceEditForm from '../service/ServiceEditForm';
import ServiceDetail from '../service/ServiceDetail';
import ServiceForm from './ServiceForm';
import 'bootstrap/dist/css/bootstrap.min.css';
const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [servicetoEdit, setServiceToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
//   const [services, setServices] = useState(null);
  const navigate = useNavigate(); // Add useNavigate hook

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const fetchServices = async () => {
      try {
        const serviceData = await serviceService.index();
        setServiceList(serviceData);
        console.log(serviceList);
        
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

//   const fetchServices = async () => {
//     try {
//       const services = await serviceService.index();
//       if (!services) {
//         throw new Error(services);
// // =======
// //   const [services, setServices] = useState([]);

// //   useEffect(() => {
// //     const fetchServices = async () => {
// //       try {
// //         const serviceData = await serviceService.index();
// //         setServices(serviceData);
// //       } catch (error) {
// //         console.error("Error fetching services:", error);
// // >>>>>>> main
//       }
//       setServiceList(services);
//       console.log(services);
//     } catch (err) {
//       console.log(err);
//     }
//   };
  useEffect(() => {
    fetchServices();
  }, []);

  const handleDeleteService = async (id) => {
    const deletedService = await serviceService.remove(id);
    setServiceList(serviceList.filter((ser) => ser._id !== deletedService._id));
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchServices();
  };

//   const services = serviceList.map((ser, index) => (
//     <li key={ser._id}>
//       <ServiceDetail
//         {...ser}
//         id={ser._id}
//         key={index}
//         setIsEdit={changeEdit}
//         setServiceToEdit={setServiceToEdit}
//         handleDeleteService={handleDeleteService}
//       />
//     </li>
//   ));

  return (
    <div className="service">
      <div className="add-service-button-container">
        <Link to="/services/new">
        <button className="add-service-button">Add Service</button>
        </Link>
    </div>
      <div className="title">
        <h2>Our Services</h2>
      </div>
      
      <div className="box">
        {services.map((service) => (
          <div className="card" key={service._id}>
            <br />
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
