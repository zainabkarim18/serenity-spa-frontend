import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';

const ServiceEditForm = (props) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [serviceEditing, setServiceEditing]= useState({})

  useEffect(() => {
    async function getService() {
      console.log(props.serviceID);
      const serviceData = await serviceService.detail(props.serviceID);
      setServiceEditing(serviceData);
      console.log(serviceData);
      
    }
    getService();
  }, []);

 const navigate = useNavigate();

  const handleChange = (evt) => {
    setServiceEditing({ ...serviceEditing, [evt.target.name]: evt.target.value });
  };



const handleUpdateService = async (formData) => {
    try {
      console.log("formData:",formData);
      
      const updatedService = await serviceService.update(formData);
      if (!updatedService) {
        throw new Error(updatedService);
      };
  
      props.setIsEdit();
    } catch (error) {
      console.log(error);
    };
  };


   const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleUpdateService(serviceEditing);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Service Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={serviceEditing.name}
          onChange={handleChange}
        />
        
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          name="description"
          id="description-input"
          value={serviceEditing.description}
          onChange={handleChange}
        />
        
        <label htmlFor="duration-input">Duration</label>
        <input
          required
          type="text"
          name="duration"
          id="duration-input"
          value={serviceEditing.duration}
          onChange={handleChange}
        />
        
        <label htmlFor="price-input">Price</label>
        <input
          required
          type="text"
          name="price"
          id="price-input"
          value={serviceEditing.price}
          onChange={handleChange}
        />
      <input type='hidden' value={serviceEditing._id} name='id'></input>
        <button type="submit" onClick={() => setIsFormOpen(false)}>Edit {serviceEditing.name} Service</button>
      </form>
    </main>
  );
};

export default ServiceEditForm;