import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import TechDashboard from "./pages/tech-dashboard/TechDashboard";
import CustomerForm from "./components/customers/CustomerForm";
import ServiceOrderCreate from "./pages/service-order-create/ServiceOrderCreate";
import TechRegister from "./pages/tech-register/TechRegister";
import { MainLayout } from "./layouts/MainLayout";
import { authLoaderWithData } from "./utils/authLoaders";
import CostumerList from "./components/customers/CostumerList";
import CostumerDetails from "./components/customers/CostumerDetails";

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
                element: <CustomerForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/edit/:id",
                element: <CustomerForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-orders/create",
                element: <ServiceOrderCreate/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/list",
                element: <CostumerList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/:id",
                element: <CostumerDetails/>,
                loader: authLoaderWithData,
            }
        ],
    },
    {
        path: "*",
        element: <div style={{ padding: '20px', textAlign: 'center' }}><h1>404 - Página não encontrada</h1></div>,
    },


]);