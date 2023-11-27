import { ArrowDown, ArrowUp } from 'lucide-react';
import { TableColumns } from '.';
import twcls from '../../util/twcls';

export interface TableHeadProps<T> {
    columns: TableColumns<T>[];
    sortField?: keyof T;
    sortOrder: boolean;
    setSortField: React.Dispatch<React.SetStateAction<keyof T | undefined>>;
    setSortOrder: React.Dispatch<React.SetStateAction<boolean>>;
}
function TableHead<T>({ columns, sortField, sortOrder, setSortField, setSortOrder }: TableHeadProps<T>) {

    return (
        <div className="table-header-group">
            <span className="table-row border-b border-b-gray-200 dark:border-b-primary sticky top-0">
                {columns.map(({ label, accessor, sortable, defaultSortField, defaultSortAsc, className }) => {
                    if (sortable && !sortField && defaultSortField) {
                        setTimeout(() => {
                            setSortField(accessor);
                            setSortOrder(!!defaultSortAsc);
                        }, 0);
                    }
                    return <span className={twcls(
                        "table-cell text-left p-1 font-bold text-xs text-gray-600",
                        className,
                    )} key={accessor as string}>
                        <span className={twcls(
                            "inline-flex gap-x-3 all-center",
                            (sortable && "px-4 cursor-pointer select-none py-1 rounded-full hover:bg-gray-300 dark:hover:bg-black transition-all"),
                        )} onClick={() => {
                            if (sortable) {
                                if (sortField === accessor) {
                                    setSortOrder(order => !order);
                                } else {
                                    setSortField(accessor);
                                    setSortOrder(true);
                                }
                            }
                        }}>
                            {label}
                            {sortable && sortField === accessor && (sortOrder ? <ArrowDown /> : <ArrowUp />)}
                        </span>
                    </span>;
                })}
            </span>
        </div>
    )
}

export default TableHead;