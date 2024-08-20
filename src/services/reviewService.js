// reviewService.js
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/reviews`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });


    return res.json();
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error; 
  }
};

const show = async (reviewId) => {
  try {
    const res = await fetch(`${BASE_URL}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error('Error fetching review:', error);
    throw error;
  }
};

const create = async (userId, serviceId, formData) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${userId}/${serviceId}`, options);


    return res.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

const update = async (reviewId, formData) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    const res = await fetch(`${BASE_URL}/${reviewId}`, options);


    return res.json();
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

const remove = async (reviewId) => {
  try {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const res = await fetch(`${BASE_URL}/${reviewId}`, options);


    return res.json();
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};

const getByServiceId = async (serviceId) => {
  try {
    const res = await fetch(`${BASE_URL}/service/${serviceId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error('Error fetching reviews for service:', error);
    throw error;
  }
};

export {
  index,
  show,
  create,
  update,
  remove,
  getByServiceId,
};