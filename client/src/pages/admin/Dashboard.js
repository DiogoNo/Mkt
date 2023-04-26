import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/product">
        CreateProduct
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/products">
        Products
      </NavLink>
    </div>
  );
};

export default AdminDashboard;
