import axios from "axios";

export const getAccessToken = (code: string) => {
    console.log("service", code);
    return axios.get(
        `${
            import.meta.env.VITE_API_URL
        }/api/v1/users/get-access-token?code=${code}`
    );
};
