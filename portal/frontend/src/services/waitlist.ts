import axios from "axios";

export const sendWaitlistRequest = async (email: string) => {
    const apiKey = import.meta.env.VITE_PHOENIX_API_KEY;
    const appSecretKey = import.meta.env.VITE_PHOENIX_APP_SECRET_KEY;

    return axios.post(
        "http://localhost:3001/api/v1/waitlist",
        {
            appSecretKey,
            data: {
                email,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        }
    );
};
