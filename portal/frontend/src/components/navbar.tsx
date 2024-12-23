import { Link } from "react-router-dom";
import LogoWithName from "./img/logo-w-name";
import { Button } from "./ui/button";

const NavBar = () => {
    return (
        <nav className="flex justify-between py-6 px-10 bg-[#152733]">
            <Link to="/">
                <LogoWithName />
            </Link>
            <Link to="/waitlist">
                <Button className="bg-[#C6FCA6]">Join to waitlist</Button>
            </Link>
        </nav>
    );
};

export default NavBar;
