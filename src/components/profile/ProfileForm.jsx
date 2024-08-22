import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ProfileForm = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateUser(formData);
      setUser(updatedUser); // Update user state
      setMessage('Profile updated successfully!');
      navigate('/profile'); // Redirect to profile page
    } catch (err) {
      console.error('Error updating profile:', err);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  return (
<div className="profile-form-container">
  <div className="profile-form-card">
    <h1 className="profile-form-title">Edit Profile</h1>
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <button type="submit" className="profile-submit-button">Update Profile</button>
    </form>
    {message && <p className="form-message">{message}</p>}
  </div>
</div>

  );
};

export default ProfileForm;
