import axios from "axios";

export const sendWaitlistRequest = async (email: string) => {
    const apiKey = import.meta.env.VITE_QUEUE_UP_API_KEY;
    const appSecretKey = import.meta.env.VITE_QUEUE_UP_APP_SECRET_KEY;

    return axios.post(
        "https://queue-up-a5fc64164a33.herokuapp.com/api/v1/waitlist",
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
