import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import Product from "./pages/Product";
import Category from "./pages/Category";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";

import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Dashboard = lazy(() => import("./pages/user/Dashboard"));

const PageNotFound = () => {
  return <div>PageNotFound</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<Category />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
