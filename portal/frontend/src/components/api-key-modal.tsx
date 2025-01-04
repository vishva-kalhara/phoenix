import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Clipboard, KeySquare } from "lucide-react";
import ConfirmDialog from "./confirm-dialog";

const APIKeyModel = () => {
    const regenerateKey = () => {};

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
                        <Button>
                            <Clipboard color="black" /> Copy to clipboard
                        </Button>
                        <ConfirmDialog
                            onActionPerformed={regenerateKey}
                            trigger="Regenerate"
                            description="Application's unique Secret Key for authenticating API
                    requests and managing waitlist data securely."
                            title="Regenerate App Secret Key?"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default APIKeyModel;
