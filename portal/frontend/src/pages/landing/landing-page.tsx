import Logo from "@/components/img/logo";
import LogoBlack from "@/components/img/logo-black";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        document.title = "Phoenix | Licensing Provider";
    }, []);

    return (
        <>
            <section className="pt-32 pb-6">
                <div className="max-w-4xl w-full mx-auto">
                    <div className="">
                        <div className="bg-gradient-to-b from-[#C6FCA6] to-[#A7FCEE] p-12 rounded-lg great-shadow size-[150px] mx-auto">
                            <LogoBlack />
                        </div>
                        <div className="bg-[#081b28] py-12 flex -mt-2 text-center flex-col px-10 gap-5">
                            <h1 className="text-xl md:text-3xl  font-semibold leading-relaxed">
                                Effortless Licensing for Your <br /> Standalone
                                Apps
                            </h1>
                            <p className="max-w-prose text-sm md:text-normal text-white/70 mx-auto leading-relaxed">
                                Ensure seamless subscription management with our
                                powerful platform designed for Java and C#
                                applications.
                            </p>
                            <div className="mt-4 flex gap-4 justify-center">
                                <Link to="/docs">
                                    <Button className="border-[#FFFFFF]/10 border-2 text-white font-semibold bg-[#081B28] hover:bg-white/5">
                                        Documentation
                                    </Button>
                                </Link>

                                <Link to="/portal">
                                    <Button className="bg-gradient-to-br from-[#C6FCA6] to-[#a7fceeba] text-black font-semibold ">
                                        {token ? "Go to Portal" : "Get Started"}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-6 pb-24">
                <div className="max-w-4xl w-full mx-auto p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6 w-full">
                            <div className="p-8 border-[7px] border-white/5 rounded-xl flex flex-col gap-2 bg-clip-content overflow-clip">
                                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed">
                                    Cross-Language Support
                                </h3>
                                <p className="max-w-prose text-sm md:text-normal text-white/70 mx-auto leading-relaxed">
                                    Works seamlessly with Java, C# & Electron
                                    applications via dedicated libraries.
                                </p>
                                <div className="w-full gap-4 flex mt-6">
                                    <div className="p-4 bg-white/5 rounded-lg">
                                        <img src="/icons8-java.svg" />
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg">
                                        <img src="/icons8-c-sharp-logo.svg" />
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg">
                                        <img src="/icons8-javascript.svg" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 border-[7px] border-white/5 rounded-xl flex flex-col gap-2 bg-clip-content overflow-clip">
                                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed">
                                    Seamless Payment Integration with Stripe
                                </h3>
                                <p className="max-w-prose text-sm md:text-normal text-white/70 mx-auto leading-relaxed">
                                    Easily collect payments and manage
                                    subscriptions with Stripe integration,
                                    ensuring smooth transactions for your
                                    customers.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="p-8 pr-0 border-[7px] border-white/5 rounded-xl flex flex-col gap-2 bg-clip-content overflow-clip">
                                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed">
                                    Built-in UI components
                                </h3>
                                <p className="max-w-prose text-sm md:text-normal text-white/70 mx-auto leading-relaxed">
                                    Ensure seamless subscription management with
                                    our powerful platform designed for Java and
                                    C# applications.
                                </p>
                                <div className="flex justify-end mt-16 mb-4">
                                    <div className="bg-[#1E1E1E] px-6 p-2 rounded-l-lg w-full sm:w-5/6 great-shadow">
                                        <div className="w-full flex gap-3 items-center">
                                            <Logo height="16" />
                                            <h3 className="text-xs md:text-sm  font-semibold leading-relaxed font-robotoMono">
                                                Protected by Phoenix
                                            </h3>
                                        </div>
                                        <div className="w-full py-16 flex justify-center items-center ">
                                            <div className="flex justify-center flex-col">
                                                <div className="size-4 mx-auto border-4 rounded-full border-white/10 mb-2 border-t-[#C6FCA6] rotate-45" />
                                                <p className=" font-robotoMono text-sm">
                                                    Verifying...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-white/5">
                <div className="max-w-4xl w-full mx-auto px-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <h3 className="text-xl md:text-2xl text-center sm:text-start mb-6  font-semibold leading-relaxed">
                            Manage Your Licenses in <br /> 3 Simple Steps
                        </h3>
                        <div className="w-full flex flex-col gap-10">
                            {[
                                {
                                    heading: "Configure the Portal",
                                    description:
                                        "Setup your app and set subscription plans through our vendor portal.",
                                },
                                {
                                    heading: "Import the Package",
                                    description:
                                        "Download & add our Java or C# package to your app.",
                                },
                                {
                                    heading: "Automate Revenue Collection",
                                    description:
                                        "Our system ensures only active subscriptions can run your app.",
                                },
                            ].map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="size-10 shrink-0 flex items-center justify-center bg-white/10 rounded-full">
                                        {index + 1}
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <h3 className="text-normal md:text-lg  font-semibold leading-relaxed mt-1">
                                            {step.heading}
                                        </h3>
                                        <p className="max-w-prose text-sm md:text-normal text-white/70 leading-relaxed -mt-1">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-28 pb-6 px-10">
                <div className="max-w-4xl w-full mx-auto bg-white/5 border-white/10 border-2 rounded-xl p-12 relative ">
                    <h1 className="text-xl md:text-2xl text-center font-semibold leading-relaxed">
                        Start now, no strings attached
                    </h1>
                    <p className="text-sm md:text-normal text-white/70 mx-auto leading-relaxed text-center">
                        Free for now.
                    </p>
                    <div className="mt-8 flex gap-4 justify-center">
                        <Link to="/portal">
                            <Button className="bg-gradient-to-br from-[#C6FCA6] to-[#a7fceeba]">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingPage;
