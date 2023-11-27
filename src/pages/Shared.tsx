
import { Link } from 'react-router-dom';
import AddNew from '../assets/images/add-new.svg?react';
import EmptyContent from '../framer/EmptyContent';
import Table from '../components/Table';
import { Share } from 'lucide-react';
import Tippy from '@tippyjs/react';
import useAppContext from '../context/useAppContext';
import useSharedList from '../hooks/useSharedList';
import SharedListType from '../types/SharedList';
import copyShareKey from '../util/copyShareKey';
import { useDocumentTitle } from 'react-unique-hooks';

function PageShared() {
    const [sharedlist, loading] = useSharedList();
    const { user } = useAppContext();

    useDocumentTitle("Shared with me");

    if (!user) return null;

    return (
        <>
            <div className="flex-child flex-1 flex-child-col p-3 md:p-5 w-full overflow-x-auto">
                <Table<SharedListType> loading={loading} data={sharedlist} accessor="id" pathKey="shareKey" columns={[
                    { label: "Title", path: "./:shareKey", accessor: "title", sortable: true, defaultSortField: true, defaultSortAsc: true, className: "w-3/5" },
                    { label: "Date shared", path: "./:shareKey", accessor: "sharedAt", display: "sharedContent", sortable: true, className: "hidden sm:table-cell" },
                    {
                        label: "", accessor: "append", render: (item) => {
                            return (
                                <span className="space-x-3 invisible group-hover:visible">
                                    <Tippy content="Copy share link">
                                        <button className="cs-b-round border border-[#7771] !w-8 !h-8" onClick={() => copyShareKey(item.shareKey)}><Share /></button>
                                    </Tippy>
                                </span>
                            );
                        }, className: "min-w-[55px] hidden xs:table-cell"
                    },
                ]} />
            </div>
            {!loading && sharedlist.length === 0 && <EmptyContent set={(list) => list.shared} />}
            <Link to="./new" className="cs-btn-5 m-3 sticky bottom-5 left-full">
                <AddNew />
            </Link>
        </>
    )
}

export default PageShared;