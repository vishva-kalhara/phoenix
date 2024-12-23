import { Link } from "react-router-dom";
import LogoWithName from "./img/logo-w-name";
import { Button } from "./ui/button";

const NavBar = () => {
    return (
        <nav className="flex justify-between py-6 px-10 bg-[#152733]">
            <LogoWithName />
            <Link to="/waitlist">
                <Button className="bg-gradient-to-br from-[#C6FCA6] to-[#a7fceeba] text-black font-semibold ">
                    Join to waitlist
                </Button>
            </Link>
        </nav>
    );
};

export default NavBar;
