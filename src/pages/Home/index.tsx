import { useNavigate } from "react-router-dom";
import SharedHeader from "../../components/Header";
import SaveButton from "../../components/SaveButton";
import TextArea from "../../components/TextArea";
import useCreateNote from "../../hooks/useCreateNote";
import DashFooter from "../../layout/Dashboard/Footer";
import { useDocumentTitle } from "react-unique-hooks";

function PageHome() {
    const { loading, value, submit, setValue } = useCreateNote();
    const navigate = useNavigate();

    useDocumentTitle("Share & express your thoughts");
    return (
        <main className="relative flex-1 flex flex-col overflow-hidden">
            <SharedHeader />
            <section className="flex-1 overflow-hidden relative">
                <section className="absolute inset-0 overflow-auto">
                    <section className="min-h-[calc(100dvh_-_100px)] flex-parent relative">
                        <div className="flex-child flex-child-col flex-1 p-5 flex flex-col">
                            <header className="flex items-center pb-5 gap-3 flex-wrap">
                                <div className="flex-1">
                                    <h1 className="font-bold text-lg">Create and share your notes</h1>
                                    <h2 className="text-[#727888]">Sign in to access more features.</h2>
                                </div>
                                <SaveButton className="mr-auto" onClick={() => submit().then((shareKey) => shareKey && navigate(`/s/${shareKey}`))} loading={loading} disabled={!value.trim() || loading} children="Create" />
                            </header>
                            <TextArea placeholder="Enter your note content here..." onChange={setValue} disabled={loading} />
                        </div>
                    </section>
                    <DashFooter />
                </section>
            </section>
        </main>
    )
}

export default PageHome;