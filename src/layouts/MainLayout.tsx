import { Outlet, useLoaderData } from "react-router-dom";
import NeogenNavbar from "../components/navbar/NeogenNavbar";
import { emptySession, type UserSession } from "../core/session";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export function MainLayout() {
    const loaderData = useLoaderData() as UserSession | null;

    const { setUser } = useAuth();

    useEffect(() => {
        if (loaderData && loaderData.id !== 0) {
            setUser(loaderData);
        } else {
            setUser(emptySession);
        }
    }, [loaderData, setUser]);

    return (
        <>
            <NeogenNavbar/>
            <main className='min-h-[80vh]'>
                <Outlet/>
            </main>
        </>
    )
}