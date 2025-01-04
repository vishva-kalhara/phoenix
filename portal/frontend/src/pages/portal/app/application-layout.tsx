import { Button } from "@/components/ui/button";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Settings2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { getApp } from "@/services/application-service";
import { setCurrentApp, setIsFetching } from "@/state/slices/apps-slice";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/loading-spinner";

const ApplicationLayout = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { apps, auth } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();

    const { toast } = useToast();

    useEffect(() => {
        document.title = `Phoenix | ${apps.currentApp?.name}`;
    }, [apps]);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                dispatch(setIsFetching(true));
                const data = await getApp(id || "", auth.accessToken || "");
                dispatch(setCurrentApp(data.data.app));
            } catch (error: AxiosError | unknown) {
                const axiosError = error as AxiosError<{ message: string }>;
                toast({
                    variant: "destructive",
                    description:
                        axiosError.response?.data?.message ||
                        "An error occurred",
                });
                navigate("/not-found");
            } finally {
                dispatch(setIsFetching(false));
            }
        };

        fetchApp();
    }, [navigate, toast, id, dispatch, auth.accessToken]);

    return (
        <section>
            <div className="border-white/5 border-b-2 w-full flex">
                <div className="p-10 max-w-4xl w-full mx-auto flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="hover:bg-white/10"
                            size="icon"
                        >
                            <ArrowLeft />
                        </Button>
                        <h3 className="text-normal md:text-lg  font-semibold leading-relaxed">
                            {apps.currentApp?.name}
                        </h3>
                    </div>
                    <Link to="configure">
                        <Button
                            variant="outline"
                            className="hover:bg-white/10 bg-white/0 border-white/10"
                            size="icon"
                        >
                            <Settings2 />
                        </Button>
                    </Link>
                </div>
            </div>
            {apps.isFetching ? <LoadingSpinner /> : <Outlet />}
        </section>
    );
};

export default ApplicationLayout;
