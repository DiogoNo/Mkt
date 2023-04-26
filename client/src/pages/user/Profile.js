import { NavLink } from "react-router-dom";

const UserProfile = () => {
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/user">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/user/orders">
        Orders
      </NavLink>
    </div>
  );
};

export default UserProfile;
