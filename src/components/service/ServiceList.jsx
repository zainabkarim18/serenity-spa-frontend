import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as serviceService from '../../services/serviceService';

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);
    useEffect(() => {
        const fetchServices = async () => {
            try {
            const services = await serviceService.index();
            if (services.error) {  
                throw new Error(services.error);
            }
            setServiceList(services);
            } catch (err) {
            console.log(err);
        }
        };
        fetchServices();
    }, []);

    return (
        <div>
        <h1>Service List</h1>
        {!serviceList.length ? (
            <h2>No Services Yet!</h2>
        ) : (
            <ul>
            {serviceList.map((ser) => (
                <li key={ser._id}>
                <Link to={`/services/${ser._id}`}>{ser.name}</Link>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};


export default ServiceList;