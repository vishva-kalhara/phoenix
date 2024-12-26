import axios from "axios";

export const getMyApps = (token: string) => {
    return axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/applications/my-apps`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
