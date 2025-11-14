import api from './api';

export const getAllSleepTracker = async () => {
    const res = await api.get('/sleep/user');
    return res.data.data;
};
export const addSleepTracker = async data => await api.post('/sleep', data);

export const getAverageSleep = async () => {
    const res = await api.get('/sleep/average');
    return res.data.data;
};