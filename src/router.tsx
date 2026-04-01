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
import ProductCategoryList from "./components/product-category/ProductCategoryList";
import ProductCategoryDetails from "./components/product-category/ProductCategoryDetails";
import ProductCategoryForm from "./components/product-category/ProductCategoryForm";
import ProductList from "./components/product/ProductList";
import ProductDetails from "./components/product/ProductDetails";
import ProductForm from "./components/product/ProductForm";
import ServiceTypeList from "./components/serviceTypes/ServiceTypeList";
import ServiceTypeDetails from "./components/serviceTypes/ServiceTypeDetails";
import ServiceTypeForm from "./components/serviceTypes/ServiceTypeForm";

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
                element: <ProductCategoryForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/product-categories/edit/:id",
                element: <ProductCategoryForm/>,
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
                element: <ProductForm/>,
                loader: authLoaderWithData,
            },
            {
                path: "/products/edit/:id",
                element: <ProductForm/>,
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