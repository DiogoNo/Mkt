import { NavLink } from "react-router-dom";

const AdminProduct = () => {
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>
    </div>
  );
};

export default AdminProduct;
