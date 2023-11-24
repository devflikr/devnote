import React from 'react'
import twcls from '../util/twcls';

export interface SaveButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    loading: boolean;
}

function SaveButton({ className, disabled, loading, children, ...props }: SaveButtonProps) {
    return (
        <button className={twcls(
            "bg-blue-100 dark:bg-gray-800 [:not(:disabled)]:hover:bg-blue-500 [:not(:disabled)]:dark:hover:bg-blue-600  transition-all px-5 text-blue-500 [:not(:disabled)]:hover:text-white font-bold py-2 rounded",
            (disabled && "cursor-not-allowed opacity-50"),
            (loading && "pt-2 pb-1"),
            className,
        )} disabled={disabled} {...props}>{loading ? <l-ring
            size="20"
            stroke="2"
            bg-opacity="0"
            speed="2"
            color="currentColor"
        />: (children || "Save")}</button>
    )
}

export default SaveButton;