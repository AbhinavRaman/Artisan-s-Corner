import { createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../layouts/MainLayout";
import ProductDetails from "../pages/ProductDetails";
import VendorLayout from "../layouts/VendorLayout";
import DashboardHome from "../pages/vendor/DashboardHome";
import AddProduct from "../pages/vendor/AddProduct";
import MyProducts from "../pages/vendor/MyProducts";
import VendorOrders from "../pages/vendor/VendorOrders";
import VendorRoute from "./VendorRoute";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
    {
        path: "/product/:id",
        element: (
            <MainLayout>
                <ProductDetails />
            </MainLayout>
        ),
    },
    {
        path: "/login",
        element: (
            <MainLayout>
                <Login />
            </MainLayout>
        ),
    },
    {
        path: "/register",
        element: (
            <MainLayout>
                <Register />
            </MainLayout>
        ),
    },

    {
        path: "/vendor/dashboard",
        element: (
            <VendorRoute>
                <VendorLayout>
                    <DashboardHome />
                </VendorLayout>
            </VendorRoute>
        ),
    },
    {
        path: "/vendor/add-product",
        element: (
            <VendorRoute>
                <VendorLayout>
                    <AddProduct />
                </VendorLayout>
            </VendorRoute>
        ),
    },
    {
        path: "/vendor/products",
        element: (
            <VendorRoute>
                <VendorLayout>
                    <MyProducts />
                </VendorLayout>
            </VendorRoute>
        ),
    },
    {
        path: "/vendor/orders",
        element: (
            <VendorRoute>
                <VendorLayout>
                    <VendorOrders />
                </VendorLayout>
            </VendorRoute>
        ),
    },

    {
        path: "/cart",
        element: (
            <MainLayout>
                <Cart />
            </MainLayout>
        ),
    },

    {
        path: "/checkout",
        element: (
            <MainLayout>
                <Checkout />
            </MainLayout>
        ),
    },
    {
        path: "order-success",
        element: (
            <MainLayout>
                <OrderSuccess />
            </MainLayout>
        ),
    },
]);

export default router;