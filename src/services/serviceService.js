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


export { index };