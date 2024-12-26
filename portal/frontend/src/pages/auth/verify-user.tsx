import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { setAccessToken } from "@/state/slices/auth-slice";
import { AppDispatch, RootState } from "@/state/store";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyUserPage = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const { toast } = useToast();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
        // dispatch('data.data.access_token');
        console.log("access: ", token ? true : false);

        if (code && !token) {
            console.log("access: ", token ? true : false);
            const fetchAccessToken = async () => {
                try {
                    // // const data = await getAccessToken(code);
                    const data = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL
                        }/api/v1/users/get-access-token?code=${code}`
                    );
                    console.log(data);
                    if (!token && data.data.access_token) {
                        dispatch(setAccessToken(data.data.access_token));
                        navigate("/portal");
                    }
                    await new Promise((resolve) => {
                        setTimeout(resolve, 1000);
                    });
                } catch (error: AxiosError | unknown) {
                    const axiosError = error as AxiosError<{ message: string }>;
                    toast({
                        variant: "destructive",
                        description:
                            axiosError.response?.data?.message ||
                            "An error occurred",
                    });
                }
            };
            fetchAccessToken();
        }
    }, [dispatch, navigate, toast, token]);

    return (
        <section>
            <Button> Verifying...</Button>
        </section>
    );
};

export default VerifyUserPage;

// 1835d4bbdf7de0826b09 c1e9ff9f8fadc6dd55a9
