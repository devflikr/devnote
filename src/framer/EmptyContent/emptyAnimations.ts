import emptyDashboardAnimation from '../../assets/lottie/empty-list.json';
import emptyStarredAnimation from '../../assets/lottie/empty-stars.json';
import emptySharedAnimation from '../../assets/lottie/empty-shares.json';
import emptyHistoryAnimation from '../../assets/lottie/empty-history.json';
import emptyTrashAnimation from '../../assets/lottie/empty-bin.json';

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

} as const;

export default emptyAnimations;