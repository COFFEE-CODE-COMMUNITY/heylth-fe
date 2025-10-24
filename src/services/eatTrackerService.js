import api from './api';

export const getAllEatTracker = async () => {
    const res = await api.get('/eat');
    return res.data;
}