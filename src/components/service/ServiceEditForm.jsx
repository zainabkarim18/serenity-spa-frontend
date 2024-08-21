import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';

const ServiceEditForm = () => {
  const { id } = useParams();
  const [serviceEditing, setServiceEditing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await serviceService.detail(id);
        setServiceEditing(serviceData);
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (evt) => {
    setServiceEditing({ ...serviceEditing, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const updatedService = await serviceService.update(serviceEditing);
        navigate(`/services/${id}`);
    
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Edit {serviceEditing.name} Service</h2>
        <label htmlFor="name-input">Service Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={serviceEditing.name || ''}
          onChange={handleChange}
        />

        <label htmlFor="description-input">Description</label>
        <textarea
          required
          name="description"
          id="description-input"
          value={serviceEditing.description || ''}
          onChange={handleChange}
        />

        <label htmlFor="duration-input">Duration</label>
        <input
          required
          type="text"
          name="duration"
          id="duration-input"
          value={serviceEditing.duration || ''}
          onChange={handleChange}
        />

        <label htmlFor="price-input">Price</label>
        <input
          required
          type="text"
          name="price"
          id="price-input"
          value={serviceEditing.price || ''}
          onChange={handleChange}
        />

        <label htmlFor="image-input">Image</label>
        <input
          type="text"
          name="image"
          id="image-input"
          value={serviceEditing.image || ''}
          onChange={handleChange}
        />
        <button type="submit">Update Service</button>
      </form>
    </main>
  );
};

export default ServiceEditForm;