import api from "./api";

export const getLifestyleStatus = async () => {
    const res = await api.get('/lifestyle/status');
    return res.data.data;
};
