import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import ApiQuery from '../api/query';
import useAppContext from '../context/useAppContext';
import { Share, Star, Trash2 } from 'lucide-react';
import NoteListType from '../types/NoteList';
import copyShareKey from '../util/copyShareKey';

export interface AppendProps {
    note: NoteListType;
    refetch: () => void;
}
function Append({ note, refetch }: AppendProps) {
    const { user } = useAppContext();

    if (!user) return null;

    return (
        <span className="space-x-3 invisible group-hover:visible">
            <Tippy content={note.starred ? "Remove from starred" : "Add to starred"}>
                <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                    const tid = toast.loading(note.starred ? "Removing from starred" : "Adding to starred");
                    ApiQuery[note.starred ? "removeFromStarred" : "addToStarred"](user, [note.key], tid).then(() => {
                        toast.success(note.starred ? "1 note removed from starred" : "1 note added to starred", { id: tid });
                        refetch();
                    });
                }}><Star fill={note.starred ? "currentColor" : "none"} /></button>
            </Tippy>
            <Tippy content="Copy share link">
                <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => copyShareKey(note.shareKey)}><Share /></button>
            </Tippy>
            <Tippy content={"Move to trash"}>
                <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                    const tid = toast.loading("Moving to trash");
                    ApiQuery.moveToTrash(user, [note.key], tid).then(() => {
                        toast.success("1 note moved to trash", { id: tid });
                        refetch();
                    });
                }}><Trash2 /></button>
            </Tippy>
        </span>
    )
}

export default Append