import { LucideIcon } from "lucide-react";
import { NavLinkProps, NavLink } from "react-router-dom";
import useSidePanel from "./useSidePanel";

export interface SideItemProps extends NavLinkProps {
    icon: LucideIcon;
    text: React.ReactNode;
}
function SideItem({ text, icon: Icon, onClick, ...props }: SideItemProps) {
    const [, setOpen] = useSidePanel();
    return (
        <NavLink end className="rounded-lg flex px-5 py-3 items-center gap-5 text-gray-500 [&.active]:text-blue-500 dark:hover:bg-gray-800 hover:bg-blue-100 transition-all" onClick={(e) => {
            onClick?.(e);
            setOpen(false);
        }} {...props}>
            <span className=""><Icon /></span>
            <span className="">{text}</span>
        </NavLink>
    )
}

export default SideItem;