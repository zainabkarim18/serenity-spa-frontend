import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const ProfileDetail = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = authService.getUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    };
    fetchUser();
  }, []); // Re-fetch on mount

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Username: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>
      <Link to="/edit-profile">
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ProfileDetail;
