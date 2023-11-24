import { User } from "devflikrauth";
import ApiEndpoint from ".";
import NoteTrueContentType from "../types/TrueContent";
import generateNoteTitle from "../util/generateNoteTitle";

export async function ApiQueryAddToStarred(user: User, keys: string[], toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.addToStarred, {}, {
        uid: user.uid,
        keys
    }, toast);
}

export async function ApiQueryRemoveFromStarred(user: User, keys: string[], toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.removeFromStarred, {}, {
        uid: user.uid,
        keys
    }, toast);
}

export async function ApiQueryMoveToTrash(user: User, keys: string[], toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.moveToTrash, {}, {
        uid: user.uid,
        keys
    }, toast);
}

export async function ApiQueryRestoreFromTrash(user: User, keys: string[], toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.restoreFromTrash, {}, {
        uid: user.uid,
        keys
    }, toast);
}

export async function ApiQueryTrashForever(user: User, keys: string[], toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.trashForever, {}, {
        uid: user.uid,
        keys
    }, toast);
}

export interface ApiQueryUpdateNoteContent {
    title?: string;
    content?: string;
    language?: string;
}

export async function ApiQueryUpdateNoteContent(user: User, note: NoteTrueContentType, updates: ApiQueryUpdateNoteContent, toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.updatenote, {}, {
        uid: user.uid,
        key: note.key,
        title: generateNoteTitle(updates.title || note.title),
        content: updates.content || note.content,
        language: updates.language || note.language,
    }, toast);
}

export interface ApiQueryShareNoteContent {
    sharable?: boolean;
    encryptionKey?: string;
    expiresAt?: Date;
    shareId?: string;
}

export async function ApiQueryShareNoteContent(user: User, note: NoteTrueContentType, updates: ApiQueryShareNoteContent, toast?: string) {
    return ApiEndpoint.fetch(ApiEndpoint.routes.sharenote, {}, {
        uid: user.uid,
        key: note.key,
        encryptionKey: updates.encryptionKey,
        expiresAt: updates.expiresAt,
        shareId: updates.shareId,
    }, toast);
}


const ApiQuery = {
    addToStarred: ApiQueryAddToStarred,
    removeFromStarred: ApiQueryRemoveFromStarred,
    moveToTrash: ApiQueryMoveToTrash,
    restoreFromTrash: ApiQueryRestoreFromTrash,
    trashForever: ApiQueryTrashForever,
    updateNote: ApiQueryUpdateNoteContent,
    shareNote: ApiQueryShareNoteContent,
};

export default ApiQuery;