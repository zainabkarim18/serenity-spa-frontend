import { useState } from 'react';
import * as serviceService from '../../services/serviceService';


const ServiceForm = ({ setService, service}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    price: ''
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

 

  const handleAddService = async (formData) => {
    try {
      const newService = await serviceService.create(formData);
      if (newService.error) {
        throw new Error(newService.error);
      }
      setService([newService, ...service]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

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
    
        <button type="submit">Add Service</button>
      </form>
    </main>
  );
};

export default ServiceForm;
