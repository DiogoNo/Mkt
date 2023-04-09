import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Orders";

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/profile" element={<UserProfile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/category" element={<AdminCategory />} />
        </Route>

        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
