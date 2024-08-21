const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const signout = () => {
  window.localStorage.removeItem('token');
};

const getUser = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const rawPayload = token.split('.')[1];
    const jsonPayload = window.atob(rawPayload);
    const user = JSON.parse(jsonPayload);
    return user;
  } catch (err) {
    console.error('Error decoding user from token:', err);
    return null;
  }
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || 'Signup failed');
    }

    return json;
  } catch (err) {
    console.error('Signup error:', err);
    throw err;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || 'Signin failed');
    }

    if (json.token) {
      window.localStorage.setItem('token', json.token);

      
      const rawPayload = json.token.split('.')[1];
      const jsonPayload = window.atob(rawPayload);
      const user = JSON.parse(jsonPayload);

      return user;
    } else {
      throw new Error('No token received from backend');
    }
  } catch (err) {
    console.error('Signin error:', err);
    throw err;
  }
};

const updateUser = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BACKEND_URL}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || 'Failed to update profile');
    }

  
    if (json.token) {
      window.localStorage.setItem('token', json.token);
    }

    return json.user;
  } catch (err) {
    console.error('Update error:', err);
    throw err;
  }
};

export default {
  signup,
  signin,
  getUser,
  signout,
  updateUser,
};
