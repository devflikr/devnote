import { useEffect, useState } from "react";
import ApiEndpoint from "../api";
import useAppContext from "../context/useAppContext";
import NoteListType from "../types/NoteList";
import formatDateOrTime from "../util/formatDateOrTime";

function useNoteList(): [list: NoteListType[], loading: boolean, error: unknown, refetch: () => void] {
    const [list, setList] = useState<NoteListType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const [trigger, setTrigger] = useState(Date.now());

    const { user } = useAppContext();

    useEffect(() => {
        if (!user) return setList([]);
        ApiEndpoint.fetch<NoteListType[]>(ApiEndpoint.routes.notelist, {}, {
            uid: user.uid,
        }).then((res) => {
            const data = (res.data || []).map(item => {
                item.createdContent = formatDateOrTime(item.createdAt);
                item.modifiedContent = formatDateOrTime(item.modifiedAt);
                return item;
            });
            setList([...data]);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [user, trigger]);

    function refetch() {
        setTrigger(Date.now());
    }

    return [list, loading, error, refetch];
}

export default useNoteList;