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
import DeviceForm from "./components/devices/DeviceForm";
import DeviceList from "./components/devices/DeviceList";
import DeviceDetails from "./components/devices/DeviceDetails";

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

            // CLIENTES
            {
                path: "/customers",
                element: <CostumerList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/:id",
                element: <CostumerDetails/>,
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

            // DISPOSITIVOS
            {
                path: "/devices",
                element: <DeviceList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/devices/:id",
                element: <DeviceDetails/>,
                loader: authLoaderWithData,
            },
            {
                path: "/devices/new",
                element: <DeviceForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/devices/edit/:id",
                element: <DeviceForm/>,
                loader: authLoaderWithData,
            },
            // ORDENS DE SERVIÇO
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