import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import authService from './services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import ServiceList from "./components/service/ServiceList";
import ServiceDetail from "./components/service/ServiceDetail";
import NavBar from "./components/partials/NavBar";
import SignupForm from './components/auth/SignUpForm';
import SigninForm from './components/auth/SignInForm';
import Footer from './components/partials/Footer';

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <div id="root">
      {/* Background wrapper */}
      <div className="background-wrapper"></div>

      {/* Navigation Bar */}
      <NavBar user={user} handleSignout={handleSignout} />

      {/* Main Content */}
      <main className="container mt-4">
        {/* Hero Section */}
        <div className="text-center mb-4">
          <h4 className="mb-3">Hello, welcome to</h4>
          <h1 className="display-3 glowing-title">
            Serenity <span>Spa</span>
          </h1>
          <h3 className="mb-4">Where you will feel most Beautiful</h3>
          <Link className="btn btn-primary btn-lg" to="/services">
            Make an Appointment
          </Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
