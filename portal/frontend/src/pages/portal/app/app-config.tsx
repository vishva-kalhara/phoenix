import ConfirmDialog from "@/components/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteApp } from "@/services/application-service";
import { removeCurrentApp } from "@/state/slices/apps-slice";
import { AppDispatch, RootState } from "@/state/store";
import { AxiosError } from "axios";
import { Clipboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AppConfig = () => {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast();
    const navigate = useNavigate();

    const copyAppSecret = () => {
        navigator.clipboard.writeText(state.apps.currentApp?.appSecret || "");
        toast({
            title: "Copied to clipboard",
            variant: "success",
        });
    };

    const confirmDelete = async () => {
        try {
            const data = await deleteApp(
                state.apps.currentApp?._id || "",
                state.auth.accessToken || ""
            );
            console.log(data);
            dispatch(removeCurrentApp());
            navigate("/portal", { replace: true });
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                variant: "destructive",
                description:
                    axiosError.response?.data?.message || "An error occurred",
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto gap-8 flex flex-col p-10">
            <div className="bg-transparent border border-white/15 p-6 sm:p-10 rounded-lg flex flex-col">
                <h6 className="text-base md:text-lg  font-semibold leading-relaxed">
                    App Secret
                </h6>
                <p className="text-sm md:text-normal text-white/70 leading-relaxed">
                    Application's unique Secret Key for authenticating API
                    requests and managing waitlist data securely.
                </p>
                <div className="flex gap-2 mt-6">
                    <Button onClick={copyAppSecret}>
                        <Clipboard color="black" /> Copy to clipboard
                    </Button>
                    <ConfirmDialog
                        onActionPerformed={confirmDelete}
                        trigger="Regenerate"
                        description="Application's unique Secret Key for authenticating API
                    requests and managing waitlist data securely."
                        title="Regenerate App Secret Key?"
                    />
                </div>
            </div>
            <div className="bg-transparent border border-white/15 p-6 sm:p-10 rounded-lg flex flex-col">
                <h6 className="text-base md:text-lg  font-semibold leading-relaxed">
                    Delete application
                </h6>
                <p className="text-sm md:text-normal text-white/70 leading-relaxed">
                    Once you delete a app, there is no going back. Please be
                    certain.
                </p>
                <div className="flex gap-2 mt-6">
                    <ConfirmDialog
                        onActionPerformed={() => {
                            confirmDelete();
                        }}
                        trigger="Delete App"
                        description="This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers."
                    />
                </div>
            </div>
        </div>
    );
};

export default AppConfig;
