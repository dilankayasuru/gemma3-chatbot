import axios from "axios";

const APP_URI = process.env.NEXT_PUBLIC_APP_URI;

export const apiCheckUser = async (email: string) => {
    try {
        const response = await axios.post(`${APP_URI!}/api/check-user`, { email: email });
        return response.data;
    } catch {
        return null;
    }
};

export const apiLogin = async (email: string, password: string) => {
    return await axios.post(`${APP_URI!}/api/login`, { email: email, password: password }).then((res) => res.data);
}

export const apiRegister = async (name: string, email: string, password: string) => {
    return await axios.post(`${APP_URI!}/api/signup`, { name: name, email: email, password: password }).then((res) => res.data);
}

export const apiSendMessage = async (message: string) => {

    const token = localStorage.getItem("token");

    return await axios.post(
        `${APP_URI!}/api/chat`,
        { message: message },
        { headers: { 'Authorization': `Bearer ${token}` } }
    ).then((res) => res.data);
}

export const apiGetMessages = async () => {

    const token = localStorage.getItem("token");

    return await axios.post(
        `${APP_URI!}/api/messages`,
        {},
        { headers: { 'Authorization': `Bearer ${token}` } }
    ).then((res) => res.data);
}