import { useState } from 'react'
import ApiEndpoint from '../api';
import generateNoteTitle from '../util/generateNoteTitle';

function useCreateNote() {
    const [value, setValue] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function submit(): Promise<string | null> {
        setLoading(true);
        try {
            const res = await ApiEndpoint.fetch<string>(ApiEndpoint.routes.createnote, {}, {
                title: generateNoteTitle(value),
                content: value,
                language: "plaintext",
            });
            return res.data || null;
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        return null;
    }

    return {
        value,
        setValue,
        submit,
        loading,
        setLoading,
    };
}

export default useCreateNote;