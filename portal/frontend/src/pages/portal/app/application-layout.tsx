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

const ApplicationLayout = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const app = useSelector((state: RootState) => state.apps.currentApp);
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch<AppDispatch>();

    const { toast } = useToast();

    useEffect(() => {
        document.title = "Phoenix " + app?.name && ` | ${app?.name}`;
    }, [app]);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                dispatch(setIsFetching(true));
                const data = await getApp(id || "", token || "");
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
                setIsFetching(false);
            }
        };

        fetchApp();
    }, [navigate, toast, token, id, dispatch]);

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
                            {app?.name}
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
            <Outlet />
        </section>
    );
};

export default ApplicationLayout;
