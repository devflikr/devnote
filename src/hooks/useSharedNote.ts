import { useEffect, useState } from "react";
import SharedNoteType from "../types/SharedNote";
import ApiEndpoint, { ApiError } from "../api";
import useAppContext from "../context/useAppContext";
import { useParams } from "react-router-dom";
import formatDateOrTime from "../util/formatDateOrTime";

function useSharedNote(): [note: SharedNoteType | null, loading: boolean, error?: ApiError] {
    const [note, setNote] = useState<SharedNoteType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError>();

    const { user } = useAppContext();

    const params = useParams();

    useEffect(() => {
        ApiEndpoint.fetch<SharedNoteType>(ApiEndpoint.routes.sharednote, {}, {
            uid: user?.uid,
            shareKey: params.shareKey,
        }).then((res) => {
            const data = res.data;
            if (!data) return setNote(null);
            data.createdContent = formatDateOrTime(data.createdAt);
            setNote(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        })
    }, [params.shareKey, user?.uid]);

    return [note, loading, error];
}

export default useSharedNote;