import TextArea from "../components/TextArea";
import LanguageSelector from "../components/Language";
import SaveButton from "../components/SaveButton";
import useSaveNote from "../hooks/useSaveNote";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "react-unique-hooks";

function PageNew() {

    const { language, setTitle, setLanguage, value, setValue, loading, submit } = useSaveNote();
    const navigate = useNavigate();

    useDocumentTitle("New note");

    return (
        <div className="flex-child flex-child-col flex-1 flex flex-col gap-5 px-5 my-5">
            <header className="flex justify-between items-center flex-wrap gap-3 bg-[#fff] shadow dark:bg-secondary p-2 rounded z-10 -mx-1">
                <input type="text" name="title" className="px-3 py-2 outline-none bg-slate-100 bg-gray-200 dark:bg-primary shadow rounded-lg basis-64 flex-shrink flex-1 max-w-md mr-auto" placeholder="Note title..." onChange={(e) => setTitle(e.target.value)} />
                <span className="inline-flex flex-shrink-0 flex-1 basis-32 max-w-xs"><LanguageSelector disabled={loading} setLang={(lang) => setLanguage(lang)} /></span>
                <SaveButton className="basis-24" loading={loading} disabled={!value.trim() || loading} onClick={() => submit().then((note_id) => note_id && navigate(`../note/${note_id}#newEntry`))} />
            </header>
            <TextArea placeholder="Start typing here..." language={language} disabled={loading} onChange={(value) => setValue(value)} />
        </div>
    );
}

export default PageNew;