interface SharedNoteType {
    id: string;
    key: string;

    title: string;
    content: string;
    language: string;

    createdAt: Date;
    createdContent: string;

    shareKey: string;
}

export default SharedNoteType;