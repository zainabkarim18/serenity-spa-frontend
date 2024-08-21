export default function ServiceDetail (props) {

  const editService =()=>{
    props.setIsEdit();
    props.setServiceToEdit(props._id)
    }

  

  return (
    <div>


      <h1>Name: {props.name}</h1>
      <h2>Description: {props.description}</h2>
      <h2>Duration: {props.duration}</h2>
      <h2>
        Price: {props.price}
        {props.price > 1 ? "BD" : ""}
      </h2> 
      <button  onClick={()=>editService()}>Edit Service</button>
      <button  onClick={() => props.handleDeleteService(props._id)}> Delete Service</button>
    
      
      {/* <Reviews serviceId={id} />  */}
    </div>
  );
};

