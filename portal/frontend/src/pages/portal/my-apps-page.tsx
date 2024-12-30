import AppCard from "@/components/app-card";
import LoadingSpinner from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { getMyApps } from "@/services/application-service";
import { setMyApps } from "@/state/slices/apps-slice";
import { AppDispatch, RootState } from "@/state/store";
import { IApplication } from "@/types/application-types";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyAppsPage = () => {
    const [isFetching, setIsFetching] = useState(true);

    const { toast } = useToast();

    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch<AppDispatch>();
    const apps = useSelector((state: RootState) => state.apps.apps);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getMyApps(token || "");
                dispatch(setMyApps(data.data.apps));
            } catch (error: AxiosError | unknown) {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    variant: "destructive",
                    description:
                        axiosError.response?.data?.message ||
                        "An error occurred",
                });
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [token, toast, dispatch]);

    return (
        <section className="pt-16 px-6 relative min-h-[60dvh]">
            {isFetching ? (
                <LoadingSpinner />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
                    <Link to="/portal/new-app">
                        <div className="h-60 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center gap-2 font-medium border-2 border-[white]/5  transition-all duration-300">
                            <Plus className="" /> Create new App
                        </div>
                    </Link>
                    {apps.map((app: IApplication, index) => (
                        <AppCard app={app} key={index} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default MyAppsPage;
