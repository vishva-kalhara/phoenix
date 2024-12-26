import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { sendWaitlistRequest } from "@/services/waitlist-service";
import { AxiosError } from "axios";
import { useState } from "react";

const WaitlistPage = () => {
    const [email, setEmail] = useState("");

    const { toast } = useToast();

    const submitForm = async () => {
        try {
            await sendWaitlistRequest(email);
            window.location.href = "/waitlist/success";
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
        <section className="pt-32 px-10 relative">
            <div className="max-w-md w-full bg-white/5 mx-auto rounded-lg light-shadow p-6 sm:p-10">
                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed text-center">
                    Get Early Access
                </h3>
                <p className="text-sm/3 mt-2 text-white/70 mx-auto leading-relaxed text-center">
                    Early access members get exclusive updates and offers.
                    Don&apos;t miss out!
                </p>
                {/* <form onSubmit={submitForm} className="mt-10 "> */}
                <div className="mt-10 ">
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-white/70">Email *</Label>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            submitForm();
                        }}
                        className="w-full mt-6 py-5 bg-[#C6FCA6]"
                    >
                        Join Waitlist
                    </Button>
                </div>
                {/* </form> */}
            </div>
        </section>
    );
};

export default WaitlistPage;
