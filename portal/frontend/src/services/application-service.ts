import { createAppSchema } from "@/pages/portal/app/use-create-app";
import axios from "axios";
import { z } from "zod";

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

export const createApp = ({
    data,
    token,
}: {
    data: z.infer<typeof createAppSchema>;
    token: string;
}) => {
    return axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/applications/`,
        {
            name: data.title,
            plans: [
                {
                    planName: data.planTitle,
                    validityInDays: data.validFor,
                    price: data.amount,
                },
            ],
        },
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};
