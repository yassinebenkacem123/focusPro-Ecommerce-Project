import type { JSX, ReactNode } from "react";
import { useEffect } from "react";
import { animatePageIn } from "../lib/animations";

type TemplateProps = {
    children: ReactNode;
};

const Template = ({ children }: TemplateProps): JSX.Element => {
    useEffect(() => {
        animatePageIn();
    }, []);

    return (
        <>
            <div
                id="banner-1"
                className="min-h-screen bg-orange-400 z-10 fixed top-0 left-0 w-1/4"
            />
            <div
                id="banner-2"
                className="min-h-screen bg-orange-400 z-10 fixed top-0 left-1/4 w-1/4"
            />
            <div
                id="banner-3"
                className="min-h-screen bg-orange-400 z-10 fixed top-0 left-2/4 w-1/4"
            />
            <div
                id="banner-4"
                className="min-h-screen bg-orange-400 z-10 fixed top-0 left-3/4 w-1/4"
            />

            {children}
        </>
    );
};

export default Template;