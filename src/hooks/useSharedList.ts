import { useEffect, useState } from "react";
import ApiEndpoint from "../api";
import useAppContext from "../context/useAppContext";
import formatDateOrTime from "../util/formatDateOrTime";
import SharedListType from "../types/SharedList";

function useSharedList(): [list: SharedListType[], loading: boolean, error: unknown] {
    const [list, setList] = useState<SharedListType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const { user } = useAppContext();

    useEffect(() => {
        if (!user) return setList([]);
        ApiEndpoint.fetch<SharedListType[]>(ApiEndpoint.routes.sharedlist, {}, {
            uid: user.uid,
        }).then((res) => {
            const data = (res.data || []).map(item => {
                item.sharedContent = formatDateOrTime(item.sharedAt);
                return item;
            });
            setList([...data]);
        }).catch((error) => {
            setError(error);
        }).finally(() => {
            setLoading(false);
        });
    }, [user]);

    return [list, loading, error];
}

export default useSharedList;