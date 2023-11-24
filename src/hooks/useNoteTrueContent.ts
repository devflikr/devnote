import { useEffect, useState } from "react";
import ApiEndpoint, { ApiError } from "../api";
import useAppContext from "../context/useAppContext";
import formatDateOrTime from "../util/formatDateOrTime";
import NoteTrueContentType from "../types/TrueContent";
import { useParams } from "react-router-dom";

function useNoteTrueContent(): [note: NoteTrueContentType | null, loading: boolean, error: ApiError | undefined, refetch: () => void] {
    const [note, setNote] = useState<NoteTrueContentType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError>();

    const [trigger, setTrigger] = useState(Date.now());

    const { user } = useAppContext();

    const params = useParams();

    useEffect(() => {
        if (!user || !params.note_id) return setNote(null);
        ApiEndpoint.fetch<NoteTrueContentType>(ApiEndpoint.routes.getTrueNote, {}, {
            uid: user.uid,
            key: params.note_id,
        }).then((res) => {
            const data = res.data;
            if (!data) return setNote(null);
            data.createdContent = formatDateOrTime(data.createdAt);
            data.modifiedContent = formatDateOrTime(data.modifiedAt);
            setNote(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [user, params.note_id, trigger]);

    function refetch() {
        setTrigger(Date.now());
    }

    return [note, loading, error, refetch];
}

export default useNoteTrueContent;