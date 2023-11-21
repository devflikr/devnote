import React, { useState } from "react";
import TableBody from "./Body";
import TableHead from "./Head";
import uuid from "../../util/uuid";
import Skeleton from "react-loading-skeleton";

export interface TableColumns<T> {
    label: React.ReactNode;
    accessor: keyof T;
    path?: string;
    render?: (item: T) => React.ReactNode;
    className?: string;
    sortable?: boolean;
    display?: keyof T;
    defaultSortField?: boolean;
    defaultSortAsc?: boolean;
}
export interface TableProps<T> {
    data: T[];
    columns: TableColumns<T>[];
    accessor: string;
    pathKey: string;
    loading?: boolean;

}

function Table<T>({ data, columns, accessor, pathKey, loading }: TableProps<T>) {
    const [sortField, setSortField] = useState<keyof T | undefined>();
    const [sortOrder, setSortOrder] = useState<boolean>(true);

    const loadingArray = (new Array(6)).fill({}).map(() => {
        const item: { [key: string]: string } = {};
        for (const col of columns) {
            item[col.accessor as string] = uuid();
        }
        item[accessor] = uuid();
        item[pathKey] = uuid();
        return item as T;
    });
    console.log(loadingArray);

    return (
        <div className="bg-white shadow overflow-hidden dark:bg-secondary min-w-full border-collapse table-fixed rounded-lg table relative">
            <TableHead<T> {...{ columns, sortField, sortOrder, setSortField, setSortOrder }} />
            {loading ?
                <TableBody<T> {...{
                    accessor, pathKey, data: loadingArray, columns: columns.map((col) => {
                        col.render = (() => <Skeleton />);
                        delete col.path;
                        return col;
                    })
                }} /> :
                <TableBody<T> {...{ accessor, pathKey, data: handleSorting<T>(data, sortField, sortOrder), columns }} />
            }
        </div>

    );
}

export default Table;

function handleSorting<T>(array: T[], sortField: keyof T | undefined, sortAsc: boolean) {
    if (sortField) {
        const sorted = [...array].sort((a, b) => {
            return (
                String(a[sortField]).localeCompare(String(b[sortField]), "en", {
                    numeric: true,
                }) * (sortAsc ? 1 : -1)
            );
        });
        return sorted;
    }
    return array;
}