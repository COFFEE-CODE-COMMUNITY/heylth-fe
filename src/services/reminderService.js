import api from "./api";

export const findUserReminder = async () => {
    const res = await api.get("/reminder");
    return res.data.data;
}
export const createReminder = async () => {
    const res = await api.get("/reminder");
    return res.data.data;
}
