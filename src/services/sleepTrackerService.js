import api from './api';

export const getAllSleepTracker = async () => {
    const res = await api.get('/sleep/user');
    console.log(res.data);
    return res.data;

};