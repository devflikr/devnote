import React, { useEffect, useState } from "react";
import AppContext, { AppTheme } from "./context";
import { User } from "devflikrauth";
import { SkeletonTheme } from "react-loading-skeleton";

export interface ContextWrapperProps {
    children: React.ReactNode;
    user: User | null;
}

function ContextWrapper({ children, user }: ContextWrapperProps) {

    const [theme, switchTheme] = useState<AppTheme>(() => {
        if (localStorage.theme === "dark") return "dark";
        if (localStorage.theme === "light") return "light";
        return "";
    });
    const [appliedTheme, setAppliedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            localStorage.removeItem("theme");
        }
        setAppliedTheme(theme !== "" ? theme : window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");
    }, [theme]);

    return (
        <AppContext.Provider value={{ user, theme, appliedTheme, switchTheme }}>
            <SkeletonTheme baseColor={appliedTheme === "dark" ? "#121a24" : "#ebebeb"} highlightColor={appliedTheme === "dark" ? "#123" : "#f5f5f5"}>
                {children}
            </SkeletonTheme>
        </AppContext.Provider>
    );
}

export default ContextWrapper;