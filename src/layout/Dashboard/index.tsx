import SidePanel from "./SidePanel";
import DashHeader from "./Header";
import DashFooter from "./Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import PageDashboard from "../../pages/Dashboard";
import PageNew from "../../pages/New";
import PageTrash from "../../pages/Trash";
import PageStarred from "../../pages/Starred";
import PageNote from "../../pages/Note";
import PageShared from "../../pages/Shared";
import SharedContent from "../../components/SharedContent";

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
                                <Route path="/shared/:shareKey" element={<SharedContent />} />
                                <Route path="/shared" element={<PageShared />} />
                                <Route path="/note/:note_id" element={<PageNote />} />
                                <Route path="/note" element={<Navigate to="/dashboard" replace />} />
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