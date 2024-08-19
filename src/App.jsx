// import * as serviceService from './services/serviceService';
import { Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';


// Components
import ServiceList from "./components/service/ServiceList";


const App = () => {
  return (
    <>
      <div className="home-content">
        <h4>Hello, welcome to</h4>
        <h1 className="glowing-title">
          Serenity <span>Spa</span>
        </h1>
        <h3>Where you will feel most Beautiful</h3>
        <br /><br /><br />
        <a className="appoint-button" href="services.html">Make an Appointment</a>
      </div>

      <Routes>
        <Route path="/services" element={<ServiceList />} />
      </Routes>

<Link to="/services" >Services </Link>
    </>
  );
};

export default App;