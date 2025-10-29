import api from "./api";

export const getAllJournal = async () => {
    const res = await api.get('/journal');
    return res.data.data;
};

export const addJournal = async data => {
    const res = await api.post('/journal', data);
    return res.data.data;
}