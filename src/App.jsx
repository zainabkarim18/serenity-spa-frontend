import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import authService from './services/authService';

// Components
import ServiceList from "./components/service/ServiceList";
import ServiceDetail from "./components/service/ServiceDetail";
import ServiceEditForm from './components/service/ServiceEditForm';
import ServiceForm from "./components/service/ServiceForm";
import NavBar from "./components/partials/NavBar";
import SignupForm from './components/auth/SignUpForm';
import SigninForm from './components/auth/SignInForm';
import BookingList from "./components/booking/BookingList"; 
import BookingDetails from "./components/booking/BookingDetail";
import Footer from './components/partials/Footer';
import ProfileDetail from './components/profile/ProfileDetail';
import ProfileForm from './components/profile/ProfileForm';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const location = useLocation();

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const isHomePage = location.pathname === '/';

  return (
    <div id="root" className={isHomePage ? 'home-page' : 'other-page'}>
      {isHomePage && <div className="background-wrapper"></div>}
      <NavBar user={user} handleSignout={handleSignout} />
      
      {isHomePage && (
        <div className="home-content">
          <h4>Hello, welcome to</h4>
          <h1 className="glowing-title">
            Serenity <span>Spa</span>
          </h1>
          <h3>Where you will feel most Beautiful</h3>
          <br /><br /><br />
          <a className="appoint-button" href="/services">Make an Appointment</a>
        </div>
      )}

      <main className={location.pathname === '/signup' || location.pathname === '/signin' ? 'form-page-wrapper' : 'main-content'}>
        <Routes>
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/services/:id/edit" element={<ServiceEditForm />} />
          <Route path="/services/new" element={<ServiceForm />} />
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          <Route path="/profile" element={<ProfileDetail />} />
          <Route path="/edit-profile" element={<ProfileForm user={user} setUser={setUser} />} />
          <Route path="/bookings" element={<BookingList />} />
          <Route path="/bookings/:id" element={<BookingDetails />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;