import React from "react";

interface NoteListType {
    id: string;
    key: string;
    uid: string;

    title: string;

    createdAt: Date;
    createdContent: string;

    modifiedAt: Date;
    modifiedContent: string;

    append?: React.ReactNode;

    starred: boolean;

    shareKey: string;

}

export default NoteListType;