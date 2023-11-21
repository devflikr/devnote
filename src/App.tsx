import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContextWrapper from './context';
import useInitStorage from './flickrui/useInitStorage';
import UserLoader from './framer/UserLoader';
import Dashboard from './layout/Dashboard';

function App() {

    const [user, loading] = useInitStorage("localStorage");

    return (
        <UserLoader loading={loading}>
            <ContextWrapper user={user}>
                <Routes>
                    <Route path="/dashboard/*" element={<AuthVerified element={<Dashboard />} />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </ContextWrapper>
        </UserLoader>
    )
}

export default App;

function AuthVerified({ element }: { element: React.ReactNode }) {
    return (
        <>
            {element}
        </>
    );
}