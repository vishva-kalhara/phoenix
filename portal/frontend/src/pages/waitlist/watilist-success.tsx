import { Check } from "lucide-react";

const WaitlistSuccess = () => {
    return (
        <section className="pt-32 px-10 relative">
            <div className="max-w-md w-full bg-white/5 mx-auto rounded-lg light-shadow py-12 px-6 sm:p-12 ">
                <div className="flex justify-center">
                    <div className="p-4 bg-white/5 rounded-full ">
                        <Check className="text-[#C6FCA6]" />
                    </div>
                </div>
                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed text-center mt-8">
                    Success!
                </h3>
                <p className="text-sm/3 mt-2 text-white/70 mx-auto leading-relaxed text-center">
                    You&apos;ve been added to the waitlist. We&apos;ll notify
                    you as soon as your spot is ready!
                </p>
            </div>
        </section>
    );
};

export default WaitlistSuccess;
