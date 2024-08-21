import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as serviceService from "../../services/serviceService";
import ServiceEditForm from "../service/ServiceEditForm";
import ServiceDetail from "../service/ServiceDetail";
import ServiceForm from "./ServiceForm";

const ServiceList = () => {
  const [serviceList, setServiceList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [servicetoEdit, setServiceToEdit] = useState({});
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

  const changeEdit = () => {
    setIsEdit(!isEdit);
  };

  const fetchServices = async () => {
    try {
      const services = await serviceService.index();
      if (services.error) {
        throw new Error(services.error);
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
  );
};

export default ServiceList;