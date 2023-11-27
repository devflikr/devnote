import React from "react";

interface SharedListType {
    id: string;
    key: string;

    title: string;
    content: string;
    language: string;

    sharedAt: Date;
    sharedContent: string;

    shareKey: string;

    append?: React.ReactNode;
}

export default SharedListType;