import LoadingSpinner from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { getMyApps } from "@/services/application-service";
import { RootState } from "@/state/store";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyAppsPage = () => {
    const [isFetching, setIsFetching] = useState(true);

    const { toast } = useToast();

    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getMyApps(token || "");
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
    }, [token, toast]);

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
                </div>
            )}
        </section>
    );
};

export default MyAppsPage;
