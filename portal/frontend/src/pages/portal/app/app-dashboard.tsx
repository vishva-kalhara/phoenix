import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import AppDocs from "./app-docs";
import AppOverview from "./app-overview";

const AppDashboard = () => {
    const hasData = useSelector(
        (state: RootState) => state.apps.currentAppStats?.uniqueUsers != 0
    );

    return hasData ? <AppOverview /> : <AppDocs />;
};

export default AppDashboard;
