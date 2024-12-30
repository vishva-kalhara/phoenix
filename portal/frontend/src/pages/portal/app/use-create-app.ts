import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createApp } from "@/services/application-service";
import { NavigateFunction } from "react-router-dom";
import { AxiosError } from "axios";

export const createAppSchema = z.object({
    title: z.string().trim().min(1, { message: "Required" }),
    planTitle: z.string().trim().min(1, { message: "Required" }),
    validFor: z
        .string()
        .transform(Number)
        .pipe(z.number().positive("Must be greater than 0")),
    amount: z
        .string()
        .transform(Number)
        .pipe(z.number().positive("Must be greater than 0")),
});

export const useCreateApp = (token: string, navigate: NavigateFunction) => {
    const form = useForm<z.infer<typeof createAppSchema>>({
        resolver: zodResolver(createAppSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof createAppSchema>> = async (
        data
    ) => {
        try {
            const res = await createApp({
                data,
                token,
            });

            navigate(`/portal/app/${res.data.data.app._id}`);
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError<{
                message: string | undefined;
            }>;
            console.error(axiosError);
            form.setError("root", {
                message: axiosError.response?.data?.message,
            });
        }
    };

    return { form, onSubmit };
};
