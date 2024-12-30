import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useCreateApp } from "./use-create-app";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useNavigate } from "react-router-dom";

const NewAppPage = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const navigate = useNavigate();

    const {
        form: {
            register,
            handleSubmit,
            formState: { errors, isSubmitting },
        },
        onSubmit,
    } = useCreateApp(token || "", navigate);

    useEffect(() => {
        document.title = "Phoenix | New App";
    }, []);

    return (
        <section className="pt-32 px-10 relative">
            <div className="max-w-md w-full bg-white/5 mx-auto rounded-lg light-shadow p-6 sm:p-10">
                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed text-center">
                    Create new app
                </h3>
                <p className="text-sm/3 mt-2 text-white/70 mx-auto leading-relaxed text-center">
                    Easily manage licenses and streamline payment collection for
                    your projects.
                </p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-10 flex flex-col gap-4"
                >
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-white/70">Title *</Label>
                        <Input {...register("title")} />
                        {errors.title && (
                            <Label className="text-xs text-red-400">
                                {errors.title.message}
                            </Label>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-white/70">
                            Plan Name *
                        </Label>
                        <Input {...register("planTitle")} placeholder="Pro" />
                        {errors.planTitle && (
                            <Label className="text-xs text-red-400">
                                {errors.planTitle.message}
                            </Label>
                        )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full sm:w-3/5">
                            <Label className="text-xs text-white/70">
                                Subscription is valid for (days) *
                            </Label>
                            <Input {...register("validFor")} type="number" />
                            {errors.validFor && (
                                <Label className="text-xs text-red-400">
                                    {errors.validFor.message}
                                </Label>
                            )}
                        </div>
                        <div className="flex flex-col gap-1 w-full sm:w-2/5">
                            <Label className="text-xs text-white/70">
                                Amount (USD) *
                            </Label>
                            <Input {...register("amount")} />
                            {errors.amount && (
                                <Label className="text-xs text-red-400">
                                    {errors.amount.message}
                                </Label>
                            )}
                        </div>
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full mt-2 py-5 bg-[#C6FCA6]"
                    >
                        {isSubmitting ? "Creating..." : "Create Application"}
                    </Button>
                    {errors.root && (
                        <Label className="text-xs text-red-400 text-center">
                            {errors.root.message}
                        </Label>
                    )}
                </form>
            </div>
        </section>
    );
};

export default NewAppPage;
