import api from './api';

export const getAllSleepTracker = async () => {
    const res = await api.get('/sleep/user');
    return res.data.data;
};

export const addSleepTracker = async data => api.post('/sleep', data);