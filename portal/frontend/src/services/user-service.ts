import axios from "axios";

export const regenerateAPIKey = async (accessToken: string) => {
    console.log(accessToken);
    return axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/new-api-key`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const getUserApiKey = async (accessToken: string) => {
    return axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};
