import emptyDashboardAnimation from '../../assets/lottie/empty-list.json';
import emptyStarredAnimation from '../../assets/lottie/empty-stars.json';
import emptySharedAnimation from '../../assets/lottie/empty-shares.json';
import emptyHistoryAnimation from '../../assets/lottie/empty-history.json';
import emptyTrashAnimation from '../../assets/lottie/empty-bin.json';
import notAvailableAnimation from '../../assets/lottie/not-available.json';
import accessDeniedAnimation from '../../assets/lottie/access-denied.json';
import unknownErrorAnimation from '../../assets/lottie/unknown-error.json';
import pageNotFoundAnimation from '../../assets/lottie/404.json';

const emptyAnimations = {
    dashboard: {
        content: "Your Notes list is empty. Create a new one.",
        animation: emptyDashboardAnimation,
    },
    starred: {
        content: "Starred notes will appear here.",
        animation: emptyStarredAnimation,
    },
    shared: {
        content: "Shared notes will be added here automatically when you open it.",
        animation: emptySharedAnimation,
    },
    history: {
        content: "You don't have any recent notes opened yet.",
        animation: emptyHistoryAnimation,
    },
    trash: {
        content: "Notes you delete will appear here.",
        animation: emptyTrashAnimation,
    },
    deleted: {
        content: "This note has been deleted. Recover it from trash.",
        animation: emptyTrashAnimation,
    },
    hidden: {
        content: "This note does not exists. Or maybe you have deleted it permanently.",
        animation: notAvailableAnimation,
    },
    denied: {
        content: "You don't have access to this note. Try switching account.",
        animation: accessDeniedAnimation,
    },
    unknown: {
        content: "An unknown error occurred.",
        animation: unknownErrorAnimation,
    },
    page404: {
        content: "Looks like you have entered an unknown area. This page doesn't exist.",
        animation: pageNotFoundAnimation,
    },

} as const;

export default emptyAnimations;