import { Moon, Sun, SunMoon } from 'lucide-react';
import useAppContext from '../../../context/useAppContext';
import twcls from '../../../util/twcls';
import Tippy from '@tippyjs/react';

function SideTheme() {
    const {theme, switchTheme} = useAppContext();
    return (
        <footer className="px-2">
            <div className="flex p-1 w-full rounded-full overflow-hidden bg-blue-100 dark:bg-primary">
                <Tippy content="System preferred"><button onClick={() => switchTheme("")} className={twcls(
                    "flex-1 inline-flex justify-center items-center py-3 rounded-full",
                    (theme === "" && "bg-blue-300 dark:bg-secondary"),
                )}><SunMoon /></button></Tippy>
                <Tippy content="Light mode"><button onClick={() => switchTheme("light")} className={twcls(
                    "flex-1 inline-flex justify-center items-center py-3 rounded-full",
                    (theme === "light" && "bg-blue-300 dark:bg-secondary"),
                )}><Sun /></button></Tippy>
                <Tippy content="Dark mode"><button onClick={() => switchTheme("dark")} className={twcls(
                    "flex-1 inline-flex justify-center items-center py-3 rounded-full",
                    (theme === "dark" && "bg-blue-300 dark:bg-secondary"),
                )}><Moon /></button></Tippy>
            </div>
        </footer>
    )
}

export default SideTheme;