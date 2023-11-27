import { Link } from "react-router-dom";
import AppIcon from "../assets/favicon.svg?react";
import HeaderTheme from "./Theme";
import useAppContext from "../context/useAppContext";
import { HeaderApps, HeaderAvatar, SigninButton } from "flikrui";

function SharedHeader() {
    const { user } = useAppContext();
    return (
        <header className="flex w-full p-2 sm:px-5 sm:py-3 gap-2 sm:gap-3 items-center justify-between flex-nowrap relative bg-white dark:bg-secondary shadow z-30">
            <Link to={user ? "/dashboard" : "/"} className="inline-flex flex-nowrap gap-5 items-center">
                <span className="w-10 h-10">
                    <AppIcon />
                </span>
                <span className="font-title text-2xl leading-3 hidden xs:inline">DevNote</span>
            </Link>
            <div className="flex flex-nowrap gap-3">
                <HeaderTheme />
                <HeaderApps />
                <HeaderAvatar>
                    <SigninButton className="bg-blue-500 rounded-md px-5 text-white hover:bg-blue-700 focus-visible:bg-blue-700 transition-all" />
                </HeaderAvatar>
            </div>
        </header>
    )
}

export default SharedHeader;