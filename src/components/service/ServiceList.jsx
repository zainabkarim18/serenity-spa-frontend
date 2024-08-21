import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as serviceService from '../../services/serviceService';
import ServiceEditForm from '../service/ServiceEditForm';
import ServiceDetail from '../service/ServiceDetail';
import ServiceForm from './ServiceForm';

const ServiceList = () => {
    const [serviceList, setServiceList] = useState([]);
    const [isEdit,setIsEdit] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
    const [servicetoEdit,setServiceToEdit]= useState({})
    
    const changeEdit=()=>{
        setIsEdit(!isEdit)
        if(isEdit==true){
            setIsAdd(false)
        }else{
            setIsAdd(true)
        }
    }
   
    useEffect(() => {
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
        fetchServices();
        
    }, []);

      const handleDeleteService = async (id) => {
  const deletedService = await serviceService.remove(id);
  setServiceList(serviceList.filter((ser) => ser._id !== deletedService._id));

};
    const services =serviceList.map((ser,index) => (
                <li key={ser._id}>
                {/* <Link to={`/services/${ser._id}`}>{ser.name}</Link> */}
                <ServiceDetail {...ser} id={ser._id} key={index} setIsEdit={changeEdit} setServiceToEdit={setServiceToEdit} handleDeleteService={handleDeleteService}/>
                </li>

    ))
    return (
        <div>
            { !isEdit && <ServiceForm />}
             <div>
            {isEdit && servicetoEdit ? 
            <ServiceEditForm setIsEdit={changeEdit} serviceID={servicetoEdit} /> :
            ""   
        }
        <div>
        <h1>Service List</h1>
        {/* <Link to="/services/add">Add New Service</Link> */}
            <ul>
            {services}
            </ul>
       
            
        </div>
        </div>
        </div>
    );
};


export default ServiceList;