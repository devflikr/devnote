import { User, setCurrentAuthIndex } from 'devflikrauth';
import { useEffect, useState } from 'react'
import { useAuthUsers } from 'react-devflikrauth-hooks';
import { useSearchParams } from 'react-router-dom';

const STORAGE_KEY = "uis"

function useInitStorage(storage: "localStorage" | "sessionStorage" = "sessionStorage"): [user: User | null, loading: boolean, error: unknown] {

    const bucket = window[storage];

    const [sudoUsers, loading, error] = useAuthUsers();

    const [user, setUser] = useState<User | null>(null);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (loading) return;

        if (!sudoUsers.length) {
            setUser(null);
            return;
        }

        let authIndex = parseInt(searchParams.get("auth") || "");

        if (Number.isNaN(authIndex) && bucket.getItem(STORAGE_KEY) !== null && !Number.isNaN(parseInt(bucket.getItem(STORAGE_KEY) || "0"))) {
            authIndex = parseInt(bucket.getItem(STORAGE_KEY) || "0");
        }

        if (Number.isNaN(authIndex)) authIndex = 0;

        if (authIndex >= sudoUsers.length) authIndex = 0;

        setUser(sudoUsers[authIndex]);
        setCurrentAuthIndex(authIndex);

        bucket.setItem(STORAGE_KEY, authIndex + "");

    }, [bucket, loading, searchParams, sudoUsers]);

    return [user, loading, error];
}

export default useInitStorage;