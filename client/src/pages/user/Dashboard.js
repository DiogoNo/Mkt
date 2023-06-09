import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/user/orders">
        Orders
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/user/profile">
        Profile
      </NavLink>
    </div>
  );
};

export default Dashboard;
