import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'react-unique-hooks';

function DashHeaderSearch() {
    const [value, setValue] = useState<string>("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    useDebounce(() => {
        if (!value) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate(`/dashboard/search?q=${encodeURIComponent(value)}`, { replace: true });
        }
    }, 300, [value]);
    return (
        <>
            <form className="hidden flex-nowrap bg-gray-200 dark:bg-secondary pl-4 rounded-lg items-center max-w-[440px] w-1/2 text-gray-500 sm:inline-flex" onSubmit={(e) => e.preventDefault()}>
                <Search size={16} />
                <input className="bg-transparent px-3 h-10 self-stretch outline-none flex-1" placeholder="Search your notes..." type="search" name="q" id="search" defaultValue={decodeURIComponent(searchParams.get("q") || "")} onChange={(e) => setValue(e.target.value.trim())} />
            </form>
            <button className="w-10 h-10 flex sm:hidden ml-auto justify-center items-center rounded-full"><Search /></button>
        </>
    )
}

export default DashHeaderSearch;