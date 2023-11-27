import useAppContext from "../../context/useAppContext";

function DashFooter() {
    const { user } = useAppContext();
    return (
        <footer className="flex px-5 py-2 border-t flex-col-reverse items-center sm:flex-row border-dashed border-gray-300 dark:border-t-gray-800 justify-between gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-gray-600">
            <div className="">© 2023 DevFlikr Organization • All Rights Reserved.</div>
            <div className="space-x-3">
                <a href={`https://devflikr.com/about/privacy${user ? `?auth=${user?.index}` : ""}`} target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <span>•</span>
                <a href={`https://devflikr.com/about/terms${user ? `?auth=${user?.index}` : ""}`} target="_blank" rel="noopener noreferrer">Terms of Use</a>
            </div>
        </footer>
    )
}

export default DashFooter;