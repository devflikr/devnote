import DashHeaderSearch from './Search';
import { HeaderApps, HeaderAvatar } from 'flikrui';
import { Music } from 'lucide-react';
import { SidePanelToggler } from '../SidePanel';

function DashHeader() {

    return (
        <header className="flex w-full p-2 sm:px-5 sm:py-3 gap-2 sm:gap-3 rounded-lg items-center justify-between flex-nowrap relative">
            <div className="flex md:hidden gap-3 sm:gap-5">
                <SidePanelToggler />
                <span className="bg-blue-400 p-2 rounded-xl">
                    <Music />
                </span>
            </div>
            <DashHeaderSearch />
            <div className="flex flex-nowrap gap-3">
                <HeaderApps className="w-10 h-10 flex justify-center items-center rounded-full" />
                <HeaderAvatar />
            </div>
        </header>
    )
}

export default DashHeader;