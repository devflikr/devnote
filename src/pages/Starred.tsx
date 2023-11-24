
import { Link } from 'react-router-dom';
import AddNew from '../assets/images/add-new.svg?react';
import EmptyContent from '../framer/EmptyContent';
import Table from '../components/Table';
import NoteListType from '../types/NoteList';
import { Share, Star, Trash2 } from 'lucide-react';
import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import ApiQuery from '../api/query';
import useAppContext from '../context/useAppContext';
import useStarredList from '../hooks/useStarredList';

function PageStarred() {
    const [starredlist, loading, , refetch] = useStarredList();
    const { user } = useAppContext();

    if (!user) return null;

    return (
        <>
            <div className="flex-child flex-1 flex-child-col p-3 md:p-5 w-full overflow-x-auto">
                <Table<NoteListType> loading={loading} data={starredlist} accessor="id" pathKey="key" columns={[
                    { label: "Title", accessor: "title", path: "../note/:key", sortable: true, defaultSortField: true, defaultSortAsc: true, className: "w-3/5" },
                    { label: "Last modified", accessor: "modifiedAt", display: "modifiedContent", path: "../note/:key", sortable: true, className: "hidden sm:table-cell" },
                    { label: "Date created", accessor: "createdAt", display: "createdContent", path: "../note/:key", sortable: true, className: "hidden lg:table-cell" },
                    {
                        label: "", accessor: "append", render: (item) => {
                            return (
                                <span className="space-x-3 invisible group-hover:visible">
                                    <Tippy content="Remove from starred">
                                        <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                                            const tid = toast.loading("Removing from starred");
                                            ApiQuery.removeFromStarred(user, [item.key], tid).then(() => {
                                                toast.success("1 note removed from starred", { id: tid });
                                                refetch();
                                            });
                                        }}><Star fill="currentColor" /></button>
                                    </Tippy>
                                    <Tippy content="Share">
                                        <Link to={`../share/${item.key}`} className="cs-b-round border border-[#7771] !w-8 !h-8"><Share /></Link>
                                    </Tippy>
                                    <Tippy content={"Move to trash"}>
                                        <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                                            const tid = toast.loading("Moving to trash");
                                            ApiQuery.moveToTrash(user, [item.key], tid).then(() => {
                                                toast.success("1 note moved to trash", { id: tid });
                                                refetch();
                                            });
                                        }}><Trash2 /></button>
                                    </Tippy>
                                </span>
                            );
                        }, className: "min-w-[120px] hidden xs:table-cell"
                    },
                ]} />
            </div>
            {!loading && starredlist.length === 0 && <EmptyContent set={(list) => list.starred} />}
            <Link to="./new" className="cs-btn-5 m-3 sticky bottom-5 left-full">
                <AddNew />
            </Link>
        </>
    )
}

export default PageStarred;