import Logo from "./img/logo";

const Footer = () => {
    return (
        <footer className="flex justify-center pb-10 pt-24">
            <div className="flex flex-col items-center">
                <Logo />
                <p className="mt-6 text-sm text-white/70">
                    Designed & Developed by Wishva
                </p>
            </div>
        </footer>
    );
};

export default Footer;
