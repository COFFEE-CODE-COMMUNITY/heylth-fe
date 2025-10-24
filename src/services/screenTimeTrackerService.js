import api from './api';

export const getAllScreenTime = async () => {
    const res = await api.get('/screenTime');
    return res.data;
};