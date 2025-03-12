import StepItem from "@/components/step-item";
import { javaDocData } from "@/pages/docs/java-doc";
import UnderConstructionDOc from "@/pages/docs/under-construction";
import { useState } from "react";

const AppDocs = () => {
    const [language, setLanguage] = useState<"java" | "c-sharp">("java");

    return (
        <div className="w-full max-w-4xl mx-auto  p-10">
            <div className="bg-white/5 p-6 sm:p-10 rounded-lg flex flex-col">
                <h3 className="text-normal md:text-xl  font-semibold leading-relaxed">
                    You&apos;re just a couple steps away from <br /> your first
                    payment.
                </h3>
                <p className="text-sm md:text-normal text-white/50 leading-relaxed mt-2">
                    Choose your application type below to get started.
                </p>
                <div className="flex gap-2 mt-8">
                    <div
                        onClick={() => setLanguage("java")}
                        className={`p-4 bg-white/5 rounded-lg border-2 hover:cursor-pointer scale-90 ${
                            language == "java"
                                ? "border-white"
                                : "opacity-75 border-white/0"
                        } `}
                    >
                        <img src="/icons8-java.svg" />
                    </div>
                    <div
                        onClick={() => setLanguage("c-sharp")}
                        className={`p-4 bg-white/5 rounded-lg border-2 hover:cursor-pointer scale-90 ${
                            language == "c-sharp"
                                ? "border-white"
                                : "opacity-75 border-white/0"
                        } `}
                    >
                        <img src="/icons8-c-sharp-logo.svg" />
                    </div>
                </div>
                <div className="w-full flex flex-col gap-16 mt-14">
                    {language == "java" ? (
                        javaDocData.map((document, index) => (
                            <StepItem
                                key={index}
                                index={index}
                                step={document.step}
                            />
                        ))
                    ) : (
                        <UnderConstructionDOc />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AppDocs;
