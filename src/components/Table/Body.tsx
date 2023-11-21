import { Link } from "react-router-dom";
import { TableColumns } from ".";
import twcls from "../../util/twcls";

export interface TableBodyProps<T> {
    accessor: string;
    pathKey: string;
    data: T[];
    columns: TableColumns<T>[];
}

function TableBody<T>({ data, columns, accessor: rowAccessor, pathKey }: TableBodyProps<T>) {
    return (
        <>
            {data.map((item) => {
                const itemKey = item[rowAccessor as keyof T] as string;
                const pathKeyVal = item[pathKey as keyof T] as string;
                return (
                    <span key={itemKey} className="table-row text-gray-500 dark:text-gray-400 text-sm border-y border-y-gray-200 dark:border-y-gray-800 last-of-type:border-b-0 hover:bg-[#0001] dark:hover:bg-[#fff1] hover:text-black dark:hover:text-white transition-all group">
                        {columns.map(({ accessor, display, path, render, className }) => {
                            const mainAccessor = display || accessor;
                            const itemPath = path ? path.replace(`:${pathKey}`, pathKeyVal) : "";
                            const itemData = item[mainAccessor] ? item[mainAccessor] as string : "—";
                            if (itemPath) return <Link to={itemPath} className={twcls(
                                "table-cell line-clamp-1 whitespace-nowrap px-5 py-2",
                                className,
                            )} key={mainAccessor as string}>{render?.(item) || itemData}</Link>;
                            return <span className={twcls(
                                "table-cell line-clamp-1 whitespace-nowrap px-5 py-2",
                                className,
                            )} key={mainAccessor as string}>{render?.(item) || itemData}</span>;
                        })}
                    </span>
                );
            })}
        </>
    )
}

export default TableBody;