const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/services`;


const update = async (formData) => {
    console.log("data", formData);

    //    const unfData = JSON.stringify(formData);
    try {
        await fetch(`${BASE_URL}/`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        // console.log(id);

        const res = await fetch(`${BASE_URL}/`);

        return res.json()
    } catch (err) {
        console.log(err)
    }
};

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


// Create
const create = async (formData) => {
    console.log("formdata", formData);

    try {
        await fetch(`${BASE_URL}/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        // console.log(options);

        const res = await fetch(`${BASE_URL}/`)
        console.log("res", res);

        return res.json()
    } catch (err) {
        console.log(err)
    }
};


const remove = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export {
    index,
    detail,
    create,
    update,
    remove
};