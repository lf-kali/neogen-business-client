import { Outlet } from "react-router-dom";
import NeogenNavbar from "../components/navbar/NeogenNavbar";
import { Sidebar } from "../components/sidebar/Sidebar";
import AppNavBar from "../components/navbar/AppNavBar";

export function MainLayout() {
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <NeogenNavbar />
            
            {/* Main content with sidebar */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                    <AppNavBar/>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}