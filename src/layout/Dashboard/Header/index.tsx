// import DashHeaderSearch from './Search';
import { SidePanelToggler } from '../SidePanel';
import { Link } from 'react-router-dom';
import HeaderTheme from '../../../components/Theme';
import AppIcon from "../../../assets/favicon.svg?react";
import { HeaderApps, HeaderAvatar } from 'flikrui';

function DashHeader() {

    return (
        <header className="flex w-full py-2 px-3 sm:px-5 sm:py-3 gap-2 sm:gap-3 items-center justify-between flex-nowrap relative bg-white dark:bg-secondary shadow z-30">
            <div className="flex md:hidden gap-3 sm:gap-5">
                <SidePanelToggler />
                <Link to="/dashboard" className="inline-flex flex-nowrap gap-5 items-center">
                    <span className="w-10 h-10">
                        <AppIcon />
                    </span>
                    <span className="font-title text-2xl leading-3 hidden xs:inline">DevNote</span>
                </Link>
            </div>
            {/* <DashHeaderSearch /> */}
            <div className="flex flex-nowrap gap-3 ml-auto">
                <HeaderTheme />
                <HeaderApps />
                <HeaderAvatar />
            </div>
        </header>
    )
}

export default DashHeader;