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

import AdminRoute from "./AdminRoute";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Vendors from "../pages/admin/Vendors";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";

import EditProduct from "../pages/vendor/EditProduct";

import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";

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

    {
        path: "/checkout",
        element: (
            <MainLayout>
            <Checkout />
            </MainLayout>
        ),
    },
    {
        path: "/order-success",
        element: (
            <MainLayout>
            <OrderSuccess />
            </MainLayout>
        ),
    },

    // Admin routes
    {
        path: "/admin",
        element: (
            <AdminRoute>
            <AdminLayout>
                <AdminDashboard />
            </AdminLayout>
            </AdminRoute>
        ),
    },
    {
        path: "/admin/users",
        element: (
            <AdminRoute>
            <AdminLayout>
                <Users />
            </AdminLayout>
            </AdminRoute>
        ),
    },
    {
        path: "/admin/vendors",
        element: (
            <AdminRoute>
            <AdminLayout>
                <Vendors />
            </AdminLayout>
            </AdminRoute>
        ),
    },
    {
        path: "/admin/products",
        element: (
            <AdminRoute>
            <AdminLayout>
                <AdminProducts />
            </AdminLayout>
            </AdminRoute>
        ),
    },
    {
        path: "/admin/orders",
        element: (
            <AdminRoute>
            <AdminLayout>
                <AdminOrders />
            </AdminLayout>
            </AdminRoute>
        ),
    },

    {
        path: "/vendor/edit-product/:id",
        element: (
            <VendorRoute>
                <VendorLayout>
                    <EditProduct />
                </VendorLayout>
            </VendorRoute>
        ),
    },

    {
        path: "/profile",
        element: (
            <MainLayout>
                <Profile />
            </MainLayout>
        )
    },
    {
        path: "/my-orders",
        element: (
            <MainLayout>
                <MyOrders />
            </MainLayout>
        )
    }
]);

export default router;