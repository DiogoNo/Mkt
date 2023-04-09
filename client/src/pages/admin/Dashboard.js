import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/product">
        CreateProduct
      </NavLink>
    </div>
  );
};

export default AdminDashboard;
