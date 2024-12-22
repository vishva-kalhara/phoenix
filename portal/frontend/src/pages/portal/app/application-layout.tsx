import { Outlet } from "react-router-dom";

const ApplicationLayout = () => {
    return (
        <section>
            <p className="text-white">App Layout</p>
            <Outlet />
        </section>
    );
};

export default ApplicationLayout;
