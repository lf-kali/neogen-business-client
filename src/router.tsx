import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import TechDashboard from "./pages/tech-dashboard/TechDashboard";
import TechRegister from "./pages/tech-register/TechRegister";
import { MainLayout } from "./layouts/MainLayout";
import { authLoaderWithData } from "./utils/authLoaders";
import CostumerList from "./components/customers/CostumerList";
import CostumerDetails from "./components/customers/CostumerDetails";
import DeviceList from "./components/devices/DeviceList";
import DeviceDetails from "./components/devices/DeviceDetails";
import ProductCategoryList from "./components/product-category/ProductCategoryList";
import ProductCategoryDetails from "./components/product-category/ProductCategoryDetails";
import ProductList from "./components/product/ProductList";
import ProductDetails from "./components/product/ProductDetails";
import ServiceTypeList from "./components/serviceTypes/ServiceTypeList";
import ServiceTypeDetails from "./components/serviceTypes/ServiceTypeDetails";
import ServiceTypeForm from "./components/serviceTypes/ServiceTypeForm";
import ServiceOrderList from "./components/service-orders/ServiceOrderList";
import ServiceOrderDetails from "./components/service-orders/ServiceOrderDetails";
import ServiceOrderForm from "./components/service-orders/ServiceOrderForm";
import ProductCategoryFormResolve from "./components/product-category/productCategoryForms/ProductCategoryFormResolve";
import ProductUpdate from "./pages/Products/ProductUpdate";
import ProductCreate from "./pages/Products/ProductCreate";
import DeviceCreate from "./pages/Devices/DeviceCreate";
import DeviceUpdate from "./pages/Devices/DeviceUpdate";
import CustomerUpdate from "./pages/Customers/CustomerUpdate";
import CustomerCreate from "./pages/Customers/CustomerCreate";

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
                element: <CustomerCreate/>,
                loader: authLoaderWithData,
            },
            {
                path: "/customers/edit/:id",
                element: <CustomerUpdate/>,
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
                element: <DeviceCreate/>,
                loader: authLoaderWithData,
            },
            {
                path: "/devices/edit/:id",
                element: <DeviceUpdate/>,
                loader: authLoaderWithData,
            },
            
            // CATEGORIAS DE PRODUTO
            {
                path: "/product-categories",
                element: <ProductCategoryList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/product-categories/:id",
                element: <ProductCategoryDetails/>,
                loader: authLoaderWithData,
            },
            {
                path: "/product-categories/new",
                element: <ProductCategoryFormResolve/>,
                loader: authLoaderWithData,
            },
            {
                path: "/product-categories/edit/:id",
                element: <ProductCategoryFormResolve/>,
                loader: authLoaderWithData,
            },
            // PRODUTOs
            {
                path: "/products",
                element: <ProductList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/products/:id",
                element: <ProductDetails/>,
                loader: authLoaderWithData,
            },
            {
                path: "/products/new",
                element: <ProductCreate/>,
                loader: authLoaderWithData,
            },
            {
                path: "/products/edit/:id",
                element: <ProductUpdate/>,
                loader: authLoaderWithData,
            },
            // SERVIÇOS
            {
                path: "/service-types",
                element: <ServiceTypeList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-types/:id",
                element: <ServiceTypeDetails/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-types/new",
                element: <ServiceTypeForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-types/edit/:id",
                element: <ServiceTypeForm/>,
                loader: authLoaderWithData,
            },
            // ORDENS DE SERVIÇO
            {
                path: "/service-orders",
                element: <ServiceOrderList/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-orders/:id",
                element: <ServiceOrderDetails/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-orders/new",
                element: <ServiceOrderForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/service-orders/edit/:id",
                element: <ServiceOrderForm/>,
                loader: authLoaderWithData,
            },
        ],
    },
    {
        path: "*",
        element: <div style={{ padding: '20px', textAlign: 'center' }}><h1>404 - Página não encontrada</h1></div>,
    },


]);