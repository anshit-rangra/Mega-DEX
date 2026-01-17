import axios from 'axios';

const backend_url : string = import.meta.env.VITE_BACKEND_URI || ""

export const json_instance = axios.create({
    baseURL: backend_url,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    }
})

export const form_data_instance = axios.create({
    baseURL: backend_url,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})