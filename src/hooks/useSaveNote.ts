import { useState } from 'react'
import useAppContext from '../context/useAppContext';
import ApiEndpoint from '../api';
import generateNoteTitle from '../util/generateNoteTitle';

function useSaveNote(defaultTitle: string = "", defaultValue: string = "", defaultLanguage: string = "plaintext") {
    const { user } = useAppContext();
    const [title, setTitle] = useState<string>(defaultTitle);
    const [value, setValue] = useState<string>(defaultValue);
    const [language, setLanguage] = useState<string>(defaultLanguage);
    const [loading, setLoading] = useState<boolean>(false);

    async function submit(): Promise<string | null> {
        if (!user) return null;
        setLoading(true);
        try {
            const res = await ApiEndpoint.fetch<string>(ApiEndpoint.routes.savenote, {}, {
                uid: user.uid,
                title: generateNoteTitle(title),
                content: value,
                language: language,
            });
            return res.data || null;
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        return null;
    }

    return {
        title,
        setTitle,
        value,
        setValue,
        submit,
        loading,
        setLoading,
        language,
        setLanguage,
    };
}

export default useSaveNote;