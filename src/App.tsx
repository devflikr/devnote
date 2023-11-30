import React from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ContextWrapper from './context';
import UserLoader from './framer/UserLoader';
import Dashboard from './layout/Dashboard';
import Shared from './layout/Shared';
import useAppContext from './context/useAppContext';
import EmptyContent from './framer/EmptyContent';
import SharedHeader from './components/Header';
import DashFooter from './layout/Dashboard/Footer';
import PageHome from './pages/Home';
import { SigninButton, useInitStorage } from 'flikrui';

function App() {

    const [user, loading] = useInitStorage("localStorage");

    return (
        <UserLoader loading={loading}>
            <ContextWrapper user={user}>
                <Routes>
                    <Route path="/*" element={<PageNotFound />} />
                    <Route path="/s/:shareKey" element={<Shared />} />
                    <Route path="/s" element={<Navigate to="/" />} />
                    <Route path="/dashboard/*" element={<AuthVerified element={<Dashboard />} />} />
                    <Route path="/" element={<AuthRedirect element={<PageHome />} />} />
                </Routes>
            </ContextWrapper>
        </UserLoader>
    )
}

export default App;

function AuthVerified({ element }: { element: React.ReactNode }) {
    const { user } = useAppContext();

    if (!user) return <>
        <SharedHeader />
        <EmptyContent set={(list) => list.login} />
        <div className="flex w-full justify-evenly pb-10 flex-wrap items-center max-w-xl mx-auto">
            <SigninButton className="bg-blue-500 rounded-md px-8 text-white hover:bg-blue-700 focus-visible:bg-blue-700 transition-all py-3" />
            <Link className="bg-blue-500 rounded-md px-8 text-white hover:bg-blue-700 focus-visible:bg-blue-700 transition-all py-3" to="/">DevNote Home</Link>
        </div>
        <DashFooter />
    </>;

    return element;
}

function AuthRedirect({ element }: { element: React.ReactNode }) {
    const { user } = useAppContext();

    if (user) return <Navigate to="/dashboard" />

    return element;
}

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <SharedHeader />
            <EmptyContent set={(list) => list.page404} />
            <div className="flex w-full justify-evenly pb-10 flex-wrap items-center max-w-xl mx-auto">
                <button onClick={() => navigate(-1)} className="bg-blue-500 rounded-md px-8 text-white hover:bg-blue-700 focus-visible:bg-blue-700 transition-all py-3">Go back</button>
                <Link className="bg-blue-500 rounded-md px-8 text-white hover:bg-blue-700 focus-visible:bg-blue-700 transition-all py-3" to="/">DevNote Home</Link>
            </div>
            <DashFooter />
        </>
    );
}