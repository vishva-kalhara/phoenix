import { StepItemDataProps } from "@/components/step-item";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export const javaDocData: StepItemDataProps[] = [
    {
        step: {
            heading: "Import the SDK",
            description:
                "Download the following .jar file and import it to your project.",
            markup: (
                <div className="mt-2 ms-14">
                    <Link to="/sdk/java">
                        <Button className="bg-white/5 text-white">
                            Download SDK <ArrowUpRight className="size-3" />
                        </Button>
                    </Link>
                </div>
            ),
        },
    },
    {
        step: {
            heading: "Initialize the SDK",
            description: "Initialize the SDK with your API key.",
            markup: (
                <div className="w-full flex flex-col mt-3 overflow-hidden rounded-lg">
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

        try {
                new Phoenix("PHOENIX_USER_API_KEY", "PHOENIX_APP_SECRET", "STRIPE_SECRET")
                        .protect();

        } catch (PhoenixNoSubscriptionException e) {

        } catch (PhoenixException | IllegalArgumentException e) {
            e.printStackTrace();
            System.exit(1);
        }
}`}
                    </SyntaxHighLighter>
                </div>
            ),
        },
    },
];
