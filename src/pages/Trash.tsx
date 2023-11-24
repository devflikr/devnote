
import { Link } from 'react-router-dom';
import AddNew from '../assets/images/add-new.svg?react';
import EmptyContent from '../framer/EmptyContent';
import Table from '../components/Table';
import { Trash2, Undo2 } from 'lucide-react';
import Tippy from '@tippyjs/react';
import toast from 'react-hot-toast';
import ApiQuery from '../api/query';
import useAppContext from '../context/useAppContext';
import TrashListType from '../types/TrashList';
import useTrashList from '../hooks/useTrashList';

function PageTrash() {
    const [trashlist, loading, , refetch] = useTrashList();
    const { user } = useAppContext();

    if (!user) return null;

    return (
        <>
            <div className="flex-child flex-1 flex-child-col p-3 md:p-5 w-full overflow-x-auto">
                <Table<TrashListType> loading={loading} data={trashlist} accessor="id" pathKey="key" columns={[
                    { label: "Title", accessor: "title", sortable: true, defaultSortField: true, defaultSortAsc: true, className: "w-3/5" },
                    { label: "Date trashed", accessor: "deletedAt", display: "deletedContent", sortable: true, className: "hidden sm:table-cell" },
                    { label: "Time left", accessor: "timeLeft", display: "timeLeftContent", sortable: true, className: "hidden lg:table-cell" },
                    {
                        label: "", accessor: "append", render: (item) => {
                            return (
                                <span className="space-x-3 invisible group-hover:visible">
                                    <Tippy content={"Restore"}>
                                        <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                                            const tid = toast.loading("Restoring note");
                                            ApiQuery.restoreFromTrash(user, [item.key], tid).then(() => {
                                                toast.success("1 note restored from trash", { id: tid });
                                                refetch();
                                            });
                                        }}><Undo2 /></button>
                                    </Tippy>
                                    <Tippy content={"Delete forever"}>
                                        <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => {
                                            const tid = toast.loading("Deleting note forever");
                                            ApiQuery.trashForever(user, [item.key], tid).then(() => {
                                                toast.success("1 note deleted permanently", { id: tid });
                                                refetch();
                                            });
                                        }}><Trash2 /></button>
                                    </Tippy>
                                </span>
                            );
                        }, className: "min-w-[76px] hidden xs:table-cell"
                    },
                ]} />
            </div>
            {!loading && trashlist.length === 0 && <EmptyContent set={(list) => list.trash} />}
            <Link to="./new" className="cs-btn-5 m-3 sticky bottom-5 left-full">
                <AddNew />
            </Link>
        </>
    )
}

export default PageTrash;