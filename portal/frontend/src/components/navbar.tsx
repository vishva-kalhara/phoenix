import { Link } from "react-router-dom";
import LogoWithName from "./img/logo-w-name";
import { Button } from "./ui/button";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const NavBar = () => {
    const token = useSelector((state: RootState) => state.auth.accessToken);

    return (
        <nav className="flex justify-between py-6 px-10 bg-[#152733]">
            <Link to="/">
                <LogoWithName />
            </Link>
            {token ? (
                <Link to="/auth/sign-out">
                    <Button className="bg-[#C6FCA6]">Sign out</Button>
                </Link>
            ) : (
                <Link to="/portal">
                    <Button className="bg-[#C6FCA6]">Get Started Now</Button>
                </Link>
            )}
        </nav>
    );
};

export default NavBar;
