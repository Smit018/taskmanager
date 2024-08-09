import axios from 'axios';

export const loginUser = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    if (data.token) {
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
};

export const registerUser = async (name, email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    if (data.token) {
        localStorage.setItem('userInfo', JSON.stringify(data));
    }
    return data;
};

export const logoutUser = () => {
    localStorage.removeItem('userInfo');
};
