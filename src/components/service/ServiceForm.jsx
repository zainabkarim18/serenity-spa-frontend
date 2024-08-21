import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';

const ServiceForm = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    price: ''
  });

  const [services,newServices] = useState([]);

 const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

 

  const handleAddService = async (formData) => {
    try {
      const newService = await serviceService.create(formData);
      if (!newService) {
        throw new Error(newService);
      }
      console.log(newService);
      newServices([services, ...newService]);
      // console.log("services",services);
      
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

// const handleUpdateService = async (formData) => {
//     try {
//       const updatedService = await serviceService.update(formData, id);
//       if (!updatedService.error) {
//         throw new Error(updatedService);
//       };
//       const updatedServices = services.map((res) => (
//         res._id !== updatedService._id ? res: updatedService
//       ));
//       newServices(updatedServices);
//     } catch (error) {
//       console.log(error);
//     };
//   };


   const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleAddService(formData);
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
          value={formData.name}
          onChange={handleChange}
        />
        
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />
        
        <label htmlFor="duration-input">Duration</label>
        <input
          required
          type="text"
          name="duration"
          id="duration-input"
          value={formData.duration}
          onChange={handleChange}
        />
        
        <label htmlFor="price-input">Price</label>
        <input
          required
          type="text"
          name="price"
          id="price-input"
          value={formData.price}
          onChange={handleChange}
        />
    
        <button type="submit" onClick={() => setIsFormOpen(false)}>Add Service</button>
      </form>
    </main>
  );
};

export default ServiceForm;
