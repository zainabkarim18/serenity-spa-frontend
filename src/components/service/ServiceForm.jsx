import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as serviceService from '../../services/serviceService';

const ServiceForm = ({ onFormSubmit }) => {
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

            // Reset form data and call the onFormSubmit callback
            setFormData({
                name: '',
                duration: '',
                description: '',
                price: '',
                image: ''
            });

            // Notify parent component to close the form
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

                <label htmlFor="image">Image Path</label>
                <input
                    required
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                />

                <button type="submit">Add Service</button>
            </form>
        </main>
    );
};

export default ServiceForm;
