import { Link } from 'react-router-dom';

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      <div className="logo">Serenity Spa</div>
      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        {user && (
          <>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
          </>
        )}
      </ul>
      <ul className="nav-right">
        {user ? (
          <li><Link onClick={handleSignout} to="/">Log Out</Link></li>
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
