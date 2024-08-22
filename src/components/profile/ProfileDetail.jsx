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
    <div className="profile-container">
    <div className="profile-card">
      <div className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-icon">
          
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-section">
          <h2 className="profile-label">Username:</h2>
          <p className="profile-value">{user.username}</p>
        </div>
        <div className="profile-section">
          <h2 className="profile-label">Email:</h2>
          <p className="profile-value">{user.email}</p>
        </div>
        <div className="profile-section">
          <h2 className="profile-label">Role:</h2>
          <p className="profile-value">{user.role}</p>
        </div>
        <Link to="/edit-profile">
          <button className="profile-edit-button">Edit Profile</button>
        </Link>
      </div>
    </div>
  </div>
  

  );
};

export default ProfileDetail;
