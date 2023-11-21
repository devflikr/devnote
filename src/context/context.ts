import { User } from "devflikrauth";
import React from "react";

export type AppTheme = "light" | "dark" | "";

export interface AppContextValue {
    user: User | null;
    theme: AppTheme;
    appliedTheme: "light" | "dark";
    switchTheme: React.Dispatch<React.SetStateAction<AppTheme>>;
}

const AppContext = React.createContext<AppContextValue>({
    user: null,
    theme: "",
    appliedTheme: "light",
    switchTheme: () => {},
});

export default AppContext;