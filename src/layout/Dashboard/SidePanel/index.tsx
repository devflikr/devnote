import { LayoutGrid, Menu, Music, Plus, Share2, Star, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSidePanel from './useSidePanel';
import twcls from '../../../util/twcls';
import SideTheme from './Theme';
import SideItem from './Item';

function SidePanel() {

    const [open] = useSidePanel();

    return (
        <div className={twcls(
            "hidden md:flex h-full flex-[1] md:max-w-xs",
            (open && "fixed inset-0 bg-[#0007] z-50 flex md:static")
        )}>
            <aside className="bg-white dark:bg-secondary h-full w-full max-w-xs flex flex-col items-stretch py-2 gap-2 border-r-2 border-r-gray-200 dark:border-r-primary">
                <header className="px-3 flex flex-nowrap gap-3">
                    <SidePanelToggler />
                    <Link to="/dashboard" className="inline-flex flex-nowrap gap-5 items-center">
                        <span className="bg-blue-400 p-2 rounded-xl">
                            <Music />
                        </span>
                        <span className="font-title text-2xl leading-3">DevNote</span>
                    </Link>
                </header>
                <section className="flex-1 overflow-auto px-3 my-8 flex flex-col">
                    <SideItem icon={Plus} text="New note" to="./new" />
                    <SideItem icon={LayoutGrid} text="Dashboard" to="/dashboard" />
                    <SideItem icon={Share2} text="Shared with me" to="./shared" />
                    <SideItem icon={Star} text="Starred" to="./starred" />
                    <SideItem icon={Trash2} text="Trash" to="./trash" />
                </section>
                <SideTheme />
            </aside>
        </div>
    )
}

export default SidePanel;

export function SidePanelToggler() {

    const [open, setState] = useSidePanel();

    return (
        <button className={twcls(
            "cs-b-round md:hidden",
            (open && "cs-b-round-true"),
        )} onClick={() => setState(state => !state)}>
            {open ? <X /> : <Menu />}
        </button>
    );
}