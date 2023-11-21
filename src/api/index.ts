import fetch from "./fetch";

export const ApiRoutes = {
    notelist: "/notelist",
    trashlist: "/trashlist",
    starredlist: "/starredlist",
    addToStarred: "/addstarred",
    removeFromStarred: "/removestarred",
    moveToTrash: "/movetotrash",
    restoreFromTrash: "/restoretrash",
    trashForever: "/trashforever",
};

export type ApiResponse<T> = {
    success: true;
    status: "success";
    message: string;
    data?: T;
}

export type ApiRejection = {
    error: true;
    status: "error";
    message: string;
    data?: unknown;
}

const ApiEndpoint = {
    routes: ApiRoutes,
    fetch,
};

export default ApiEndpoint;