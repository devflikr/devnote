import React from "react";

interface TrashListType {
    id: string;
    key: string;
    uid: string;

    title: string;

    deletedAt: Date;
    deletedContent: string;

    timeLeft?: Date;
    timeLeftContent?: string;

    append?: React.ReactNode;

}

export default TrashListType;