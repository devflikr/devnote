interface NoteTrueContentType {
    id: string;
    key: string;
    uid: string;

    title: string;
    content: string;
    language: string;

    createdAt: Date;
    createdContent: string;

    modifiedAt: Date;
    modifiedContent: string;

    starred?: boolean;
}

export default NoteTrueContentType;