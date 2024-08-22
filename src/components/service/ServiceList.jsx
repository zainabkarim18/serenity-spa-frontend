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
    <div className="container">
      <h1 className="my-4">Service List</h1>
 <Link to="/services/new" className="btn btn-primary mb-4">
        Add Service
      </Link>
      <div className="row">
        {serviceList.map((service) => (
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
