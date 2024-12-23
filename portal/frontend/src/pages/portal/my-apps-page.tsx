import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const MyAppsPage = () => {
    return (
        <section className="pt-16 px-6 relative min-h-[60dvh]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full mx-auto">
                <Link to="/portal/new-app">
                    <div className="h-60 bg-white/5 rounded-lg flex items-center justify-center gap-2 font-medium border-2 border-[white]/20">
                        <Plus className="" /> Create new App
                    </div>
                </Link>
                <Link to="/portal/456789123">
                    <div className="h-60 bg-white/5 rounded-lg flex flex-col font-medium p-10 pt-1">
                        <div className="w-full flex justify-center">
                            <div className="bg-[#FFBA52] rounded-2xl w-3/5 h-1" />
                        </div>
                        <h3 className="text-normal md:text-lg  font-semibold leading-relaxed mt-6">
                            Cross-Language Support
                        </h3>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default MyAppsPage;
