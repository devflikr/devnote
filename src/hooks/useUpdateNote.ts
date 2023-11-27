import { useState } from 'react'
import NoteTrueContentType from '../types/TrueContent';
import ApiQuery from '../api/query';
import useAppContext from '../context/useAppContext';
import toast from 'react-hot-toast';

function useUpdateNote(note: NoteTrueContentType | null) {
    const [value, setValue] = useState<string>(note?.content || "");
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const { user } = useAppContext();

    async function submit() {
        if (!user || !note) return;
        setLoading(true);
        const tid = toast.loading("Updating note content");
        ApiQuery.updateNote(user, note, {
            content: value,
        }, tid).then(() => {
            setEditMode(false);
            toast.success("Note content updated", { id: tid });
        }).finally(() => {
            setLoading(false);
        });
    }

    return {
        value,
        setValue,

        loading,
        setLoading,

        editMode,
        setEditMode,

        submit,
    };
}

export default useUpdateNote;