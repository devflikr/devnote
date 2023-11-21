import { useEffect, useState } from "react";
import ApiEndpoint from "../api";
import useAppContext from "../context/useAppContext";
import formatDateOrTime from "../util/formatDateOrTime";
import TrashListType from "../types/TrashList";
import moment from "moment";

function useTrashList(): [list: TrashListType[], loading: boolean, error: unknown, refetch: () => void] {
    const [list, setList] = useState<TrashListType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    const [trigger, setTrigger] = useState(Date.now());

    const { user } = useAppContext();

    useEffect(() => {
        if (!user) return setList([]);
        ApiEndpoint.fetch<TrashListType[]>(ApiEndpoint.routes.trashlist, {}, {
            uid: user.uid,
        }).then((res) => {
            const data = (res.data || []).map(item => {
                item.deletedContent = formatDateOrTime(item.deletedAt);
                item.timeLeft = moment(item.deletedAt).add(30, "days").toDate();
                item.timeLeftContent = moment(item.timeLeft).fromNow().replace("in ", "");
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

export default useTrashList;