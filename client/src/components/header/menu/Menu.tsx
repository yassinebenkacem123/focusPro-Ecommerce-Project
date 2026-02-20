import { Link } from "react-router-dom";
import "./menu.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

import { FaInstagram, FaLinkedin, FaDiscord, FaX, FaFacebook, } from "react-icons/fa6";
const Menu = ({
    setOpenMenu,
    isMenuOpen,
}: {
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    isMenuOpen: boolean;
}) => {
    const tl = useRef<gsap.core.Timeline | null>(null);
    const container = useRef<HTMLDivElement>(null);
    const menuLinks: { name: string, path: string }[] = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    useGSAP(() => {
        gsap.set(".menu-overlay", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            opacity: 0,
        });

        gsap.set(".menu-link-holder", { y: 80, opacity: 0 });

        tl.current = gsap
            .timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 0.9,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1,
                ease: "power4.inOut",
            })
            .to(
                ".menu-link-holder",
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out",
                },
                "-=0.4"
            );

        tl.current.eventCallback("onReverseComplete", () => {
            gsap.set(".menu-overlay", {
                opacity: 0,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            });
            gsap.set(".menu-link-holder", { y: 80, opacity: 0 });
        });
    }, { scope: container });

    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isMenuOpen]);
    return (
        <motion.div
            variants={{
                hidden: { y: -200, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.45, delay: 0.3, ease: "easeInOut" }}
            className="menu-overlay bg-stone-900" ref={container}>
            <div className="menu-overlay-bar">
                <div >
                    <Link
                        className="text-6xl font-medium"
                        to="/">
                        Focus
                        <span className="text-orange-500">
                            Pro
                        </span>

                    </Link>
                </div>

            </div>
            <div className="menu-close-icon" onClick={() => setOpenMenu(false)}>
                <p>
                    &#x2715;
                </p>
            </div>

            <div className="menu-copy">
                <div className="menu-links">
                    {menuLinks.map(link => (
                        <div className="menu-link-item" onClick={() => setOpenMenu(false)}>
                            <div className="menu-link-holder">
                                <Link
                                    className="menu-link"
                                    to={link.path}>
                                    {link.name}
                                </Link>

                            </div>

                        </div>
                    ))}
                </div>

                <div className="menu-info">
                    <div className="flex gap-10  text-white">
                        <a className="text-3xl">
                            <FaFacebook />
                        </a>
                        <a className="text-3xl">
                            <FaX />
                        </a>
                        <a className="text-3xl">
                            <FaInstagram />
                        </a>
                        <a className="text-3xl">
                            <FaLinkedin />
                        </a>
                        <a className="text-3xl">
                            <FaDiscord />
                        </a>
                    </div>
                    <div className="menu-info-col">
                        <p className="text-lg text-center text-[#FFFDE7]">
                            &copy; {new Date().getFullYear()} My Store. All rights reserved.
                        </p>
                        <p className=" text-lg text-center text-[#FFFDE7]">
                            Created By Yassine Ben Kacem
                        </p>
                    </div>
                </div>
            </div>

            <div className="menu-preview">
                <p className="text-2xl text-[#FFFDE7]">
                    View Showreel
                </p>
            </div>

        </motion.div>
    )
}

export default Menu