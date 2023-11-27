import SharedContent from "../../components/SharedContent";
import DashFooter from "../Dashboard/Footer";
import useAppContext from "../../context/useAppContext";
import { Navigate, useParams } from "react-router-dom";
import SharedHeader from "../../components/Header";

function Shared() {

    const { user } = useAppContext();

    const params = useParams();

    if (user) return <Navigate to={`/dashboard/shared/${params.shareKey}`} />

    return (
        <main className="relative flex-1 flex flex-col overflow-hidden">
            <SharedHeader />
            <section className="flex-1 overflow-hidden relative">
                <section className="absolute inset-0 overflow-auto">
                    <section className="min-h-[calc(100dvh_-_100px)] flex-parent relative">
                        <SharedContent />
                    </section>
                    <DashFooter />
                </section>
            </section>
        </main>
    )
}

export default Shared;

