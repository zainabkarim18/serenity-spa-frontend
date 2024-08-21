
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as serviceService from "../../services/serviceService";
import ServiceEditForm from '../service/ServiceEditForm';
import ServiceDetail from '../service/ServiceDetail';
import ServiceForm from './ServiceForm';
const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
  const [servicetoEdit, setServiceToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

   const changeEdit=()=>{
        setIsEdit(!isEdit)
        if(isEdit==true){
            setIsAdd(false)
        }else{
            setIsAdd(true)
        }
    }

  const fetchServices = async () => {
    try {
      const services = await serviceService.index();
      if (services.error) {
        throw new Error(services.error);
// =======
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const serviceData = await serviceService.index();
//         setServices(serviceData);
//       } catch (error) {
//         console.error("Error fetching services:", error);
// >>>>>>> main
      }
      setServiceList(services);
      console.log(services);
    } catch (err) {
      console.log(err);
    }
  };
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

  const services = serviceList.map((ser, index) => (
    <li key={ser._id}>
      <ServiceDetail
        {...ser}
        id={ser._id}
        key={index}
        setIsEdit={changeEdit}
        setServiceToEdit={setServiceToEdit}
        handleDeleteService={handleDeleteService}
      />
    </li>
  ));

    
    return (
        <div>
              {showForm && <ServiceForm onFormSubmit={handleFormSubmit} />}
      <Link to="/services/new">
        <button>Create New Service</button>
      </Link>
      <div>
        {isEdit && servicetoEdit ? (
          <ServiceEditForm setIsEdit={changeEdit} serviceID={servicetoEdit} />
        ) : (
          ""
        )}
        <div>
          <h1>Service List</h1>
          {services}
        </div>
      </div>
      </div>
// =======
//   return (
//     <div>
//       <h1>Service List</h1>
//       <Link to="/services/add">
//         <button>Add Service</button>
//       </Link>
//       <ul>
//         {services.map((service) => (
//           <li key={service._id}>
//             <Link to={`/services/${service._id}`}>
//               <h2>{service.name}</h2>
//             </Link>
//           </li>
//         ))}
//       </ul>
// >>>>>>> main
    // </div>
  );
};

export default ServiceList;