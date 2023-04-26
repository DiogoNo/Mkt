import { NavLink } from "react-router-dom";

const UserOrders = () => {
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/user">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/user/profile">
        Profile
      </NavLink>
    </div>
  );
};

export default UserOrders;
