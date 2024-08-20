const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/services`;

// INDEX - SHOW LIST
const index = async () => {
    try {
        const res = await fetch(BASE_URL)
            // ,{header : { Authorization: `Bearer ${localStorage.getItem('token')}` },});
        return res.json();
    } catch (err) {
        console.log(err);
    }
};

// Detail
const detail = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            // headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
export { 
    index,
    detail
 };