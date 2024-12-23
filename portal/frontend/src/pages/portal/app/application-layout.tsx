import { Button } from "@/components/ui/button";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, Settings2 } from "lucide-react";

const ApplicationLayout = () => {
    const navigate = useNavigate();

    return (
        <section>
            <div className="border-white/5 border-b-2 w-full flex">
                <div className="p-10 max-w-4xl w-full mx-auto flex justify-between">
                    <div className="flex gap-2 items-center">
                        <Button
                            onClick={() => navigate(-1)}
                            variant="ghost"
                            className="hover:bg-white/10"
                            size="icon"
                        >
                            <ArrowLeft />
                        </Button>
                        <h3 className="text-normal md:text-lg  font-semibold leading-relaxed">
                            School Sync
                        </h3>
                    </div>
                    <Link to="configure">
                        <Button
                            variant="outline"
                            className="hover:bg-white/10 bg-white/0 border-white/10"
                            size="icon"
                        >
                            <Settings2 />
                        </Button>
                    </Link>
                </div>
            </div>
            <Outlet />
        </section>
    );
};

export default ApplicationLayout;
