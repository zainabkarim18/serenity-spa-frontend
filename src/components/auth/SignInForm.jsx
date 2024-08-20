import authService from '../../services/authService';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignInForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateMessage('');
      const userResponse = await authService.signin(formData);
      props.setUser(userResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password } = formData;

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <div className="form-page-wrapper">
      <main className="form-container">
        <div className="form-header">
          <h2>Sign In</h2>
        </div>
        <p>{message}</p>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          
          <div>
            <button disabled={isFormInvalid()}>Sign In</button>
            <Link to="/">
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignInForm;
