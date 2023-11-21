import { Plus } from "lucide-react";
import TextArea from "../../components/TextArea";
import { Link } from "react-router-dom";

function PageNew() {
    return (
        <div className="flex-child flex-child-col flex-1 flex flex-col gap-5 px-5 mb-5">
            <header className="flex justify-between items-center gap-3 sticky top-0 bg-[#fff] shadow dark:bg-primary p-2 pl-5 rounded z-10 -mx-1">
                <span className="inline-flex items-center gap-3 text-blue-600">
                    <Plus />
                    <span>New note</span>
                </span>
                <span className="inline-flex gap-2 flex-nowrap items-center">
                    <Link to=".." className="bg-red-500 text-white hover:bg-red-400 transition-all px-4 py-1 rounded">Cancel</Link>
                    <button className="bg-green-700 text-white hover:bg-green-600 transition-all px-4 py-1 rounded">Save</button>
                </span>
            </header>
            <TextArea placeholder="Start typing here..." />
        </div>
    );
}

export default PageNew;