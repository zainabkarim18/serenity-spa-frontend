import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ServiceForm = ({ onFormSubmit }) => {
    const navigate = useNavigate();
     const [services,newServices] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        description: '',
        price: '',
        image: '',
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData({ ...formData, [name]: value });
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
   setFormData({
                name: '',
                duration: '',
                description: '',
                price: '',
                image: ''
            });

            navigate('/services');
            if (onFormSubmit) onFormSubmit();
        } catch (err) {
            console.log(err);
        }
    };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await handleAddService(formData);
  };

    return (
        <main className="container mt-5">
            <h1 className="mb-4">Add New Service</h1>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="name-input" className="form-label">Service Name</label>
                    <input
                        required
                        type="text"
                        name="name"
                        id="name-input"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="duration-input" className="form-label">Duration</label>
                    <input
                        required
                        type="text"
                        name="duration"
                        id="duration-input"
                        className="form-control"
                        value={formData.duration}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-12">
                    <label htmlFor="description-input" className="form-label">Description</label>
                    <textarea
                        required
                        name="description"
                        id="description-input"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="price-input" className="form-label">Price</label>
                    <input
                        required
                        type="text"
                        name="price"
                        id="price-input"
                        className="form-control"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="image" className="form-label">Image Path</label>
                    <input
                        required
                        type="text"
                        name="image"
                        id="image"
                        className="form-control"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">Add Service</button>
                </div>
            </form>
        </main>
    );
};

export default ServiceForm;
