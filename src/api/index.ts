import fetch from "./fetch";

export const ApiRoutes = {
    savenote: "/addnote",
    notelist: "/notelist",
    trashlist: "/trashlist",
    sharenote: "/sharenote",
    sharablenote: "/sharablenote",
    updatenote: "/updatenote",
    starredlist: "/starredlist",
    getTrueNote: "/gettruenote",
    moveToTrash: "/movetotrash",
    addToStarred: "/addstarred",
    trashForever: "/trashforever",
    restoreFromTrash: "/restoretrash",
    removeFromStarred: "/removestarred",
};

export type ApiResponse<T> = {
    success: true;
    status: "success";
    message: string;
    data?: T;
}

export type ApiRejection = {
    error: true;
    type: string;
    status: "error";
    message: string;
    data?: unknown;
}

export type ApiError = {
    error: true;
    type: string;
    status: "error";
    message: string;
    data?: unknown;
    service?: string;
    target?: string;
    content?: string;
}

const ApiEndpoint = {
    routes: ApiRoutes,
    fetch,
};

export default ApiEndpoint;