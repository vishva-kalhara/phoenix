import { IApplication } from "@/types/application-types";
import { ChartNoAxesColumn, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const AppCard = ({ app }: { app: IApplication }) => {
    return (
        <Link to={`/portal/app/${app._id}`}>
            <div className="h-60 bg-white/5 rounded-lg flex flex-col font-medium p-10 pt-1 hover:bg-white/10 transition-all duration-300">
                <div className="w-full flex justify-center">
                    <div className="bg-[#FFBA52] rounded-2xl w-3/5 h-1" />
                </div>
                <h3 className="text-normal md:text-lg  font-semibold leading-relaxed mt-8">
                    {app.name}
                </h3>
                <div className="flex gap-2 items-end mt-3">
                    <ChartNoAxesColumn className="size-5 opacity-60" />
                    <span className="text-xs text-white/60">
                        $545 earned last month
                    </span>
                </div>
                <div className="flex gap-2 items-end mt-[6px]">
                    <UsersRound className="size-5 opacity-60" />
                    <span className="text-xs text-white/60">
                        64 Unique users
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default AppCard;
