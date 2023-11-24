import { useEffect, useState } from "react";
import ApiEndpoint, { ApiError } from "../api";
import useAppContext from "../context/useAppContext";
import NoteTrueContentType from "../types/TrueContent";
import SharableType from "../types/Sharable";

function useNoteSharable(note: NoteTrueContentType): [share: SharableType | null, loading: boolean, error: ApiError | undefined, refetch: () => void] {
    const [share, setShare] = useState<SharableType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<ApiError>();

    const [trigger, setTrigger] = useState(Date.now());

    const { user } = useAppContext();


    useEffect(() => {
        if (!user || !note) return setShare(null);
        ApiEndpoint.fetch<SharableType>(ApiEndpoint.routes.sharablenote, {}, {
            uid: user.uid,
            key: note.key,
        }).then((res) => {
            const data = res.data;
            if (!data) return setShare(null);
            setShare(data);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [user, note, trigger]);

    function refetch() {
        setTrigger(Date.now());
    }

    return [share, loading, error, refetch];
}

export default useNoteSharable;