import Tippy from "@tippyjs/react";
import useAppContext from "../context/useAppContext";
import { Moon, Sun } from "lucide-react";

function HeaderTheme() {
    const { appliedTheme, switchTheme } = useAppContext();

    if (appliedTheme === "light") return <Tippy content="Dark mode"><button onClick={() => switchTheme("dark")} className="cs-b-round"><Moon /></button></Tippy>

    return <Tippy content="Light mode"><button onClick={() => switchTheme("light")} className="cs-b-round"><Sun /></button></Tippy>
}

export default HeaderTheme;