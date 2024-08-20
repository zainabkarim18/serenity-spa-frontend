import authService from '../../services/authService';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
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
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className="form-page-wrapper">
      <main className="form-container">
        <div className="form-header">
          <h2>Sign Up</h2>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
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
          
          <div className="form-control">
            <label htmlFor="passwordConf">Confirm Password:</label>
            <input
              type="password"
              id="passwordConf"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button type="button">Cancel</button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignupForm;
