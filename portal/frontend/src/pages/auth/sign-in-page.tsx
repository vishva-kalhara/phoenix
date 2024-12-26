import GitHubLogo from "@/components/img/github-logo";
import { Button } from "@/components/ui/button";

const SignInPage = () => {
    const getGitHubLoginUrl = () => {
        window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=" +
                import.meta.env.VITE_GITHUB_CLIENT_ID
        );
    };

    return (
        <section className="pt-32 px-10 relative">
            <div className="max-w-md w-full bg-white/5 mx-auto rounded-lg light-shadow p-6 sm:p-10">
                <h3 className="text-lg md:text-2xl  font-semibold leading-relaxed text-center">
                    Sign In to your <br /> Account
                </h3>

                <div className="flex flex-col  mt-10 gap-3">
                    <Button
                        className="w-full py-5 bg-[#fff]/5 text-white hover:bg-white/10"
                        onClick={getGitHubLoginUrl}
                    >
                        <GitHubLogo /> Sign in with GitHub
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default SignInPage;
