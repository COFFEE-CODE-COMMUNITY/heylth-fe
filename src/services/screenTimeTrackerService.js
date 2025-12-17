import api from './api';

export const getAllScreenTime = async () => {
    const res = await api.get('/screenTime');
    return res.data.data;
};

export const getAverageScreenTime = async () => {
    const res = await api.get('/screenTime/average');
    return res.data.data;
};

export const addScreenTime = async data => {
    const res = await api.post('/screenTime', data);
    return res.data.data;
};

export const lineChartScreenTime = async () => {
    const res = await api.get('/dashboard/lineChart');
    return res.data.data;
}