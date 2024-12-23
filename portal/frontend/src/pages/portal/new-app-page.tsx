import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NewAppPage = () => {
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
                <form className="mt-10 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <Label className="text-xs text-white/70">Title *</Label>
                        <Input />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full sm:w-3/5">
                            <Label className="text-xs text-white/70">
                                Subscription is valid for (days) *
                            </Label>
                            <Input />
                        </div>
                        <div className="flex flex-col gap-1 w-full sm:w-2/5">
                            <Label className="text-xs text-white/70">
                                Amount (USD) *
                            </Label>
                            <Input />
                        </div>
                    </div>
                    <Button className="w-full mt-2 py-5 bg-[#C6FCA6]">
                        Create Application
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default NewAppPage;
