import React from "react";
import AppContext, { AppContextValue } from "./context";

export default function useAppContext(): AppContextValue {
    const context = React.useContext(AppContext);
    if (!context) throw new Error("Unable to access App Context API.");
    return context;
}