import { User } from "devflikrauth";
import ApiEndpoint from ".";

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

const ApiQuery = {
    addToStarred: ApiQueryAddToStarred,
    removeFromStarred: ApiQueryRemoveFromStarred,
    moveToTrash: ApiQueryMoveToTrash,
    restoreFromTrash: ApiQueryRestoreFromTrash,
    trashForever: ApiQueryTrashForever,
};

export default ApiQuery;