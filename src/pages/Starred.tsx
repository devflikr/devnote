
import { Link } from 'react-router-dom';
import AddNew from '../assets/images/add-new.svg?react';
import EmptyContent from '../framer/EmptyContent';
import Table from '../components/Table';
import NoteListType from '../types/NoteList';
import useAppContext from '../context/useAppContext';
import useStarredList from '../hooks/useStarredList';
import Append from '../components/Append';
import { useDocumentTitle } from 'react-unique-hooks';

function PageStarred() {
    const [starredlist, loading, , refetch] = useStarredList();
    const { user } = useAppContext();

    useDocumentTitle("Starred");

    if (!user) return null;

    return (
        <>
            <div className="flex-child flex-1 flex-child-col p-3 md:p-5 w-full overflow-x-auto">
                <Table<NoteListType> loading={loading} data={starredlist} accessor="id" pathKey="key" columns={[
                    { label: "Title", accessor: "title", path: "../note/:key", sortable: true, defaultSortField: true, defaultSortAsc: true, className: "w-3/5" },
                    { label: "Last modified", accessor: "modifiedAt", display: "modifiedContent", path: "../note/:key", sortable: true, className: "hidden sm:table-cell" },
                    { label: "Date created", accessor: "createdAt", display: "createdContent", path: "../note/:key", sortable: true, className: "hidden lg:table-cell" },
                    { label: "", accessor: "append", render: (item) => <Append note={item} refetch={refetch} />, className: "min-w-[120px] hidden xs:table-cell" },
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