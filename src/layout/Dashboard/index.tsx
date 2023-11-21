import SidePanel from "./SidePanel";
import DashHeader from "./Header";
import DashFooter from "./Footer";
import { Route, Routes } from "react-router-dom";
import PageDashboard from "../../pages/Dashboard";
import PageNew from "../../pages/New";
import PageTrash from "../../pages/Trash";
import PageStarred from "../../pages/Starred";

function Dashboard() {

    return (
        <div className="flex flex-nowrap items-stretch flex-1 w-full">
            <SidePanel />
            <main className="relative flex-1 flex flex-col overflow-hidden">
                <DashHeader />
                <section className="flex-1 overflow-hidden relative">
                    <section className="absolute inset-0 overflow-auto">
                        <section className="min-h-[calc(100dvh_-_100px)] flex-parent relative">
                            <Routes>
                                <Route path="/starred" element={<PageStarred />} />
                                <Route path="/trash" element={<PageTrash />} />
                                <Route path="/new" element={<PageNew />} />
                                <Route path="/" element={<PageDashboard />} />
                            </Routes>
                        </section>
                        <DashFooter />
                    </section>
                </section>
            </main>
        </div>
    )
}

export default Dashboard;