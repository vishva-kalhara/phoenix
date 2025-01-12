import OverviewChart from "@/components/ui/overview-chart";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const AppOverview = () => {
    const currentAppStats = useSelector(
        (state: RootState) => state.apps.currentAppStats
    );

    return (
        <div className="w-full max-w-4xl mx-auto gap-8 flex flex-col p-10">
            <div className="flex gap-8 flex-col md:flex-row w-full">
                <div className="bg-transparent border border-white/15 p-6 rounded-lg flex flex-col w-full md:w-1/2 min-h-32">
                    <p className="text-sm md:text-normal text-white/70 leading-relaxed">
                        Earnings this Month
                    </p>
                    <h6 className="text-xl md:text-2xl mt-1 font-semibold leading-relaxed">
                        {`$${currentAppStats?.monthlyEarnings} Earned`}
                    </h6>
                </div>
                <div className="bg-transparent border border-white/15 p-6 rounded-lg flex flex-col w-full md:w-1/2 min-h-32">
                    <p className="text-sm md:text-normal text-white/70 leading-relaxed">
                        Unique Users
                    </p>
                    <h6 className="text-xl md:text-2xl mt-1 font-semibold leading-relaxed">
                        {`${currentAppStats?.uniqueUsers} Users`}
                    </h6>
                </div>
            </div>

            <div className="bg-transparent border border-white/15 p-6 rounded-lg flex flex-col">
                {currentAppStats?.chartData.length &&
                currentAppStats?.chartData.length < 2 ? (
                    <p className="text-sm md:text-normal text-center my-32 text-white/70 leading-relaxed">
                        Not enough data to visualize
                    </p>
                ) : (
                    <>
                        <p className="text-sm md:text-normal text-white/70 leading-relaxed">
                            Subscriptions
                        </p>
                        <OverviewChart
                            chartData={currentAppStats?.chartData || []}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default AppOverview;
