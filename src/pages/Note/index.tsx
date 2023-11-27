import useNoteTrueContent from '../../hooks/useNoteTrueContent';
import LoadingSpin from '../../components/LoadingSpin';
import EmptyContent from '../../framer/EmptyContent';
import Viewer from '../../components/Viewer';
import { Cog, Copy, Edit, Share, Star, Trash2 } from 'lucide-react';
import Tippy from '@tippyjs/react';
import ApiQuery from '../../api/query';
import useAppContext from '../../context/useAppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EditNoteProperties from './Properties';
import copyShareKey from '../../util/copyShareKey';
import copyNoteContent from '../../util/copyNoteContent';
import TextArea from '../../components/TextArea';
import SaveButton from '../../components/SaveButton';
import useUpdateNote from '../../hooks/useUpdateNote';
import { useDocumentTitle } from 'react-unique-hooks';

function PageNote() {
    const [note, loading, error, refetch] = useNoteTrueContent();

    const { user } = useAppContext();

    const navigate = useNavigate();

    const [titleOpen, setTitleOpen] = useState(false);

    const { value, editMode, setEditMode, setValue, loading: editLoad, submit } = useUpdateNote(note);

    useDocumentTitle(loading? "Loading" : [note?.title || "", "Notes"])

    if (!user || loading) return <LoadingSpin />;

    if (error) {
        if (error.content === "trashed") {
            return <EmptyContent set={(list) => list.deleted} />;
        } else if (error.content === "no-entry-found") {
            return <EmptyContent set={(list) => list.hidden} />;
        } else if (error.content === "access-denied") {
            return <EmptyContent set={(list) => list.denied} />;
        } else {
            return <EmptyContent set={(list) => list.denied} />;
        }
    }

    if (!note) return <EmptyContent set={(list) => list.denied} />;

    return (

        <div className="p-5 flex-1 flex-child flex-child-col flex flex-col">
            <header className="flex w-full gap-5 all-center flex-wrap mb-5">
                <span className="inline-flex flex-1 mr-auto items-center gap-3 flex-nowrap">
                    <h1 className="text-lg font-bold line-clamp-2 break-words w-full">{note.title || "Untitled"}</h1>
                </span>
                <span className="inline-flex gap-3 all-center px-3 py-1 bg-white dark:bg-secondary shadow-xl rounded-lg">
                    <Tippy content="Edit properties">
                        <button className="cs-b-round" onClick={() => setTitleOpen(true)}>
                            <Cog />
                        </button>
                    </Tippy>
                    <Tippy content="Edit note">
                        <button className="cs-b-round" onClick={() => setEditMode(!editMode)}>
                            <Edit />
                        </button>
                    </Tippy>
                    <Tippy content="Copy note content">
                        <button className="cs-b-round" onClick={() => copyNoteContent(note.content)}>
                            <Copy />
                        </button>
                    </Tippy>
                    <Tippy content={note.starred ? "Remove from starred" : "Add to starred"}>
                        <button className="cs-b-round" onClick={() => {
                            const tid = toast.loading(note.starred ? "Removing from starred" : "Adding to starred");
                            ApiQuery[note.starred ? "removeFromStarred" : "addToStarred"](user, [note.key], tid).then(() => {
                                toast.success(note.starred ? "Note removed from starred" : "Note added to starred", { id: tid });
                                refetch();
                            });
                        }}>
                            <Star fill={note.starred ? "currentColor" : "none"} />
                        </button>
                    </Tippy>
                    <Tippy content="Copy share link">
                        <button className="cs-b-round" onClick={() => copyShareKey(note.shareKey)}>
                            <Share />
                        </button>
                    </Tippy>
                    <Tippy content="Move to trash">
                        <button className="cs-b-round" onClick={() => {
                            const tid = toast.loading("Moving to trash");
                            ApiQuery.moveToTrash(user, [note.key], tid).then(() => {
                                toast.success("Note moved to trash", { id: tid });
                                navigate("../");
                            });
                        }}>
                            <Trash2 />
                        </button>
                    </Tippy>
                </span>
            </header>
            {editMode && <header className="flex w-full gap-5 all-center flex-wrap mb-5">
                <span className="inline-flex flex-1 mr-auto items-center gap-3 flex-nowrap">
                    <h1 className="w-full text-[#727888]">Editing</h1>
                </span>
                <SaveButton loading={editLoad} disabled={!value.trim() || editLoad} children="Update" onClick={submit} />
            </header>}
            {editMode ? <TextArea placeholder="Edit note..." onChange={(val) => setValue(val)} defaultValue={note.content} language={note.language} /> : <Viewer content={note.content} language={note.language} />}
            <EditNoteProperties open={titleOpen} setOpen={setTitleOpen} note={note} refetch={refetch} />
        </div>
    )
}

export default PageNote;