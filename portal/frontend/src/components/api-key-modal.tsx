import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Clipboard, KeySquare } from "lucide-react";
import ConfirmDialog from "./confirm-dialog";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { getUserApiKey, regenerateAPIKey } from "@/services/user-service";
import { useState } from "react";

const APIKeyModel = () => {
    const { toast } = useToast();

    const state = useSelector((state: RootState) => state);
    const [isProcessing, setIsProcessing] = useState(false);

    const copyAPIKey = async () => {
        try {
            setIsProcessing(true);
            const data = await getUserApiKey(state.auth.accessToken || "");
            navigator.clipboard.writeText(data.data.user.apiKey);
            toast({
                title: "Copied to clipboard",
                variant: "success",
            });
        } catch (error: AxiosError | unknown) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                variant: "destructive",
                description:
                    axiosError.response?.data?.message || "An error occurred",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const regenerateKey = async () => {
        try {
            const data = await regenerateAPIKey(state.auth.accessToken || "");
            navigator.clipboard.writeText(data.data.user.apiKey);
            toast({
                title: "Copied to clipboard",
                variant: "success",
            });
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
        <Dialog>
            <DialogTrigger>
                <Button
                    className="bg-white/5 border border-white/10 "
                    size="icon"
                >
                    <KeySquare />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="p-2 flex flex-col gap-2">
                    <DialogTitle>API Key</DialogTitle>
                    <p className="max-w-prose text-sm md:text-normal text-white/70 mx-auto leading-relaxed">
                        Keep this key private and do not share it with anyone to
                        ensure the security of your data and resources.
                    </p>
                    <div className="flex gap-2 mt-6">
                        <Button
                            onClick={copyAPIKey}
                            className="w-44"
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                "Copying..."
                            ) : (
                                <>
                                    <Clipboard color="black" /> Copy to
                                    clipboard
                                </>
                            )}
                        </Button>
                        <ConfirmDialog
                            onActionPerformed={regenerateKey}
                            trigger="Regenerate"
                            description="If you regenerate this token, you must replace the
                    Authorization headers in all your applications to ensure
                    uninterrupted access."
                            title="Regenerate User API Key?"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default APIKeyModel;
