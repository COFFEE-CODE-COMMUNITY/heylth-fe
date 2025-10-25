import api from './api';

export const getAllEatTracker = async () => {
    const res = await api.get('/eat');
    return res.data.data;
}

export const addEatTracker = async data => {
    const res = await api.post('/eat', data);
    return res.data.data;
}