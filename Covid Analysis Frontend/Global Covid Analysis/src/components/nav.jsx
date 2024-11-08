import { useState, useEffect } from "react";
import Info_svg from "../assets/svg/information-svgrepo-com";
import HelpModal from "./help_modal"; // Ensure the correct import path for HelpModal
import "../styles/nav.css";

export default function Nav() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 630);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <nav className={isScrolled ? "nav-visible" : ""}>
                <div onClick={toggleModal} style={{ cursor: "pointer" }}>
                    <Info_svg />
                </div>
            </nav>
            {isModalOpen && <HelpModal setOpenHelpModal={setIsModalOpen} />}
        </>
    );
}
