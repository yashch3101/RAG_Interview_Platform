import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const startInterview = async (formData) => {
    const response = await API.post(
        "/start-interview",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

export const submitAnswer = async (data) => {
    const response = await API.post(
        "/submit-answer",
        data
    );

    return response.data;
};

export const finishInterview = async (data) => {
    const response = await API.post(
        "/finish-interview",
        data
    );

    return response.data;
};