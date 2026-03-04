import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import TechDashboard from "./pages/tech-dashboard/TechDashboard";
import CustomerRegister from "./pages/customer-register/CustomerRegister";
import ServiceOrderCreate from "./pages/service-order-create/ServiceOrderCreate";
import TechRegister from "./pages/tech-register/TechRegister";
import { MainLayout } from "./layouts/MainLayout";
import { authLoaderWithData } from "./utils/authLoaders";

export const router = createBrowserRouter([
    {
        path:"/login",
        element: <Login/>,
    },
    {
        path: "/technician/register",
        element: <TechRegister/>,
    },
    {
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element: <TechDashboard/>,
                loader: authLoaderWithData,
            },
            {
                path: "/technician/dashboard",
                element: <TechDashboard/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/register",
                element: <CustomerRegister/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-orders/create",
                element: <ServiceOrderCreate/>,
                loader: authLoaderWithData,
            },
        ],
    },
    {
        path: "*",
        element: <div style={{ padding: '20px', textAlign: 'center' }}><h1>404 - Página não encontrada</h1></div>,
    },


]);