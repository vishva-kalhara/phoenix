import { StepItemDataProps } from "@/components/step-item";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const javaDocData: StepItemDataProps[] = [
    {
        step: {
            heading: "Install the Package",

            description:
                "Copy and paste the following dependency into your pom.xml file.",
            markup: (
                <div className="w-full flex flex-col overflow-hidden rounded-lg">
                    <div className="bg-[#000] px-4 py-2 flex justify-between items-center rounded-t-lg">
                        <div className="flex space-x-2">
                            <div className="size-3 bg-red-500 rounded-full" />
                            <div className="size-3 bg-yellow-500 rounded-full" />
                            <div className="size-3 bg-green-500 rounded-full" />
                        </div>

                        <span className="text-gray-400 text-sm">pom.xml</span>
                    </div>
                    <SyntaxHighLighter
                        language="xml"
                        style={atomDark}
                        customStyle={{
                            overflowX: "hidden",
                            borderRadius: "0px",
                            margin: 0,
                            fontFamily: "monospace",
                            padding: "2rem",
                            fontSize: "16px",
                            lineHeight: "1.5",
                        }}
                    >
                        {`<dependency>
    <groupId>io.github.vishva-kalhara</groupId>
    <artifactId>phoenix-client-java</artifactId>
    <version>1.1.0</version>
</dependency>
`}
                    </SyntaxHighLighter>
                    <div className="w-full flex gap-4 mt-4 flex-col md:flex-row">
                        <Link to="https://mvnrepository.com/artifact/io.github.vishva-kalhara/phoenix-client-java">
                            <Button className="bg-white/5 text-white border-white/10 border hover:bg-white/10">
                                Maven Repository
                                <ArrowUpRight className="size-3" />
                            </Button>
                        </Link>
                        <Link to="https://github.com/vishva-kalhara/phoenix/tree/master/packages/phoenix-client-java-lib">
                            <Button className="bg-white/5 text-white border-white/10 border hover:bg-white/10">
                                Download Dependancies (Optional){" "}
                                <Download className="size-3" />
                            </Button>
                        </Link>
                    </div>
                </div>
                // <div className="mt-2 ms-14">
                //     <Link to="https://drive.google.com/uc?export=download&id=1ATYK3iHyBe7eAfk5fLPSjO7q9EtImf_4">
                //         <Button className="bg-white/5 text-white">
                //             Download SDK <Download className="size-3" />
                //         </Button>
                //     </Link>
                // </div>
            ),
        },
    },
    {
        step: {
            heading: "Initialize the Package",
            description:
                "Initialize the package with your API key, App Id, Stripe Key and Fallback method.",
            markup: (
                <div className="w-full flex flex-col mt-3 overflow-hidden rounded-lg mb-10">
                    <div className="bg-[#000] px-4 py-2 flex justify-between items-center rounded-t-lg">
                        <div className="flex space-x-2">
                            <div className="size-3 bg-red-500 rounded-full" />
                            <div className="size-3 bg-yellow-500 rounded-full" />
                            <div className="size-3 bg-green-500 rounded-full" />
                        </div>

                        <span className="text-gray-400 text-sm">
                            Program.java
                        </span>
                    </div>
                    <SyntaxHighLighter
                        language="java"
                        style={atomDark}
                        customStyle={{
                            overflowX: "hidden",
                            borderRadius: "0px",
                            margin: 0,
                            padding: "2rem",
                            fontSize: "16px",
                            lineHeight: "1.5",
                        }}
                    >
                        {`public static void main(String args[]) {

        new PhoenixClientHandler(
                "<API_KEY>",
                "<APP_ID>",
                "<STRIPE_SECRET>",
                () -> { return true; },
                (e) -> { System.out.println(e.getMessage()); }
        );

        System.out.println("Has Access!");
}`}
                    </SyntaxHighLighter>
                </div>
            ),
        },
    },
];
