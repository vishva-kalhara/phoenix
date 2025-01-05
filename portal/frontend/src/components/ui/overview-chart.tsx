import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
    views: {
        label: "Users",
    },
    value: {
        label: "value",
        color: "#3b82f6",
    },
} satisfies ChartConfig;

const OverviewChart = ({
    chartData,
}: {
    chartData: { _id: string; value: number }[];
}) => {
    const activeChart = "value";

    return (
        <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full mt-6"
        >
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="_id"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        });
                    }}
                />
                <ChartTooltip
                    content={
                        <ChartTooltipContent
                            className="w-[150px] text-xs"
                            nameKey="views"
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString(
                                    "en-US",
                                    {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    }
                                );
                            }}
                        />
                    }
                />
                <Line
                    dataKey={activeChart}
                    type="monotone"
                    stroke={"#C6FCA6"}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    );
};

export default OverviewChart;
