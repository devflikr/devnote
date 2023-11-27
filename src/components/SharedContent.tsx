import Tippy from "@tippyjs/react";
import EmptyContent from "../framer/EmptyContent";
import useSharedNote from "../hooks/useSharedNote";
import LoadingSpin from "./LoadingSpin";
import copyNoteContent from "../util/copyNoteContent";
import copyShareKey from "../util/copyShareKey";
import { Copy, Share } from "lucide-react";
import Viewer from "./Viewer";
import twcls from "../util/twcls";
import { useDocumentTitle } from "react-unique-hooks";

export interface SharedContentProps {
    className?: string;
}
function SharedContent({ className }: SharedContentProps) {
    const [note, loading, error] = useSharedNote();

    useDocumentTitle(loading ? "Loading" : [note?.title || "", "Shared"]);

    if (loading) return <LoadingSpin />;

    if (error) {
        if (error.content === "trashed") {
            return <EmptyContent set={(list) => list.deleted2} />;
        } else if (error.content === "no-entry-found") {
            return <EmptyContent set={(list) => list.hidden2} />;
        } else {
            return <EmptyContent set={(list) => list.denied2} />;
        }
    }

    if (!note) return <EmptyContent set={(list) => list.denied2} />;

    return (
        <div className={twcls("p-5", className)}>
            <header className="flex w-full gap-5 all-center flex-wrap mb-5">
                <span className="inline-flex flex-1 mr-auto items-center gap-3 flex-nowrap flex-col">
                    <h1 className="text-lg font-bold line-clamp-2 break-words w-full">{note.title || "Untitled"}</h1>
                    <h2 className="break-words w-full capitalize">Language used: {note.language}</h2>
                    <h2 className="break-words w-full capitalize">Created at: {note.createdContent}</h2>
                </span>
                <span className="inline-flex gap-3 all-center px-3 py-1 bg-white dark:bg-secondary shadow-xl rounded-lg">
                    <Tippy content="Copy note content">
                        <button className="cs-b-round" onClick={() => copyNoteContent(note.content)}>
                            <Copy />
                        </button>
                    </Tippy>
                    <Tippy content="Copy share link">
                        <button className="cs-b-round" onClick={() => copyShareKey(note.shareKey)}>
                            <Share />
                        </button>
                    </Tippy>
                </span>
            </header>
            <Viewer content={note.content} language={note.language} />
        </div>
    );
}

export default SharedContent;