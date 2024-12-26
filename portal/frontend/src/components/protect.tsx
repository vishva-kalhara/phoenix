import { Outlet } from "react-router-dom";
import { RootState } from "@/state/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protect = () => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.accessToken);
    useEffect(() => {
        if (!token) navigate("/auth/sign-in");
    }, [navigate, token]);

    return <Outlet />;
};

export default Protect;
