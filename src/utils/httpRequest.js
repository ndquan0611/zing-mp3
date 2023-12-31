import axios from 'axios';

const request = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

export const get = async (path) => {
    const res = await request.get(path);
    return res.data;
};

export const getDetail = async (path, options) => {
    const res = await request.get(path, options);
    return res.data;
};

export default request;
