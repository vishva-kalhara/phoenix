import { Button } from "@/components/ui/button";
import { revokeAccessToken } from "@/state/slices/auth-slice";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";

const SignOutPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <section className="pt-32 px-10 relative">
            <div className="max-w-md w-full bg-white/5 mx-auto rounded-lg light-shadow p-6 sm:p-10">
                <h3 className="text-lg md:text-2xl  font-semibold leading-relaxed text-center">
                    Sign In to your Account
                </h3>
                <p className="text-sm/3 mt-2 text-white/70 mx-auto leading-relaxed text-center">
                    Sign in with GitHub to sync your workflow and get started
                    instantly!
                </p>
                <div className="flex flex-col  mt-10 gap-3">
                    <Button
                        className="w-full py-5 bg-[#fff]/5 text-white hover:bg-white/10"
                        onClick={() => {
                            dispatch(revokeAccessToken());
                        }}
                    >
                        Confirm Sign Out
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default SignOutPage;
