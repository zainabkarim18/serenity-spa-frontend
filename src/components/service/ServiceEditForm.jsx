import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      await serviceService.update(serviceEditing);
      navigate(`/services/${id}`);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  return (
    <main className="container my-5">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <h2 className="mb-4">Edit {serviceEditing.name} Service</h2>

        <div className="mb-3">
          <label htmlFor="name-input" className="form-label">Service Name</label>
          <input
            required
            type="text"
            name="name"
            id="name-input"
            className="form-control"
            value={serviceEditing.name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description-input" className="form-label">Description</label>
          <textarea
            required
            name="description"
            id="description-input"
            className="form-control"
            rows="4"
            value={serviceEditing.description || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="duration-input" className="form-label">Duration</label>
          <input
            required
            type="text"
            name="duration"
            id="duration-input"
            className="form-control"
            value={serviceEditing.duration || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price-input" className="form-label">Price</label>
          <input
            required
            type="text"
            name="price"
            id="price-input"
            className="form-control"
            value={serviceEditing.price || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image-input" className="form-label">Image URL</label>
          <input
            type="text"
            name="image"
            id="image-input"
            className="form-control"
            value={serviceEditing.image || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Update Service</button>
      </form>
    </main>
  );
};

export default ServiceEditForm;
