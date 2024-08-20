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
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    console.error(err);
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

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      // Save it to local storage
      console.log("Token received:", json.token);
      window.localStorage.setItem('token', json.token);

      // Decode payload
      const rawPayload = json.token.split('.')[1];
      const jsonPayload = window.atob(rawPayload);

      const user = JSON.parse(jsonPayload);
      console.log("Decoded user from token:", user);

      return user;
    } else {
      throw new Error('No token received from backend');
    }
  } catch (err) {
    console.error("Sign-in failed:", err);
    throw err;
  }
};


export default {
  signup,
  signin,
  getUser,
  signout
};
