import { useEffect, useState } from 'react';
import authService from '../../services/authService';

const ProfileDetail = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = authService.getUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Username: {user.username}</h1>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>
      {/* Add more user details as needed */}
    </div>
  );
};

export default ProfileDetail;