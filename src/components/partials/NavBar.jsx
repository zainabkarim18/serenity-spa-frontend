import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      <div className="logo">MyLogo</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        {user ? (
          <>
            <li><Link onClick={handleSignout} to="/">Log Out</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
