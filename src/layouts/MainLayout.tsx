import { Outlet } from "react-router-dom";
import NeogenNavbar from "../components/navbar/NeogenNavbar";

export function MainLayout() {
    return (
        <>
            <NeogenNavbar/>
            <main className='min-h-[80vh]'>
                <Outlet/>
            </main>
        </>
    )
}