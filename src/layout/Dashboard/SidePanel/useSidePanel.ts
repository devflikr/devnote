import { useEffect, useState } from "react";

type SidePanelTypeListener = (state: boolean) => void;

type SidePanelType = {
    state: boolean;
    listeners: SidePanelTypeListener[];
}

export const sidePanel: SidePanelType = {
    state: false,
    listeners: [],
};

export function onSidePanelStateChange(callback: SidePanelTypeListener) {
    sidePanel.listeners.push(callback);
    return () => {
        sidePanel.listeners = sidePanel.listeners.filter((listener) => listener !== callback);
    };
}


export default function useSidePanel(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [state, setState] = useState(sidePanel.state);

    useEffect(() => {
        const snap = onSidePanelStateChange((state) => {
            setState(state);
        });
        return snap;
    }, []);

    function updateState(state: boolean | ((state: boolean) => boolean)) {
        if (typeof state === "function") {
            sidePanel.state = state(sidePanel.state);
        } else {
            sidePanel.state = state;
        }
        sidePanel.listeners.forEach(listener => listener(sidePanel.state));
    }

    return [state, updateState];
}