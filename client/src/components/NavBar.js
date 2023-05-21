import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import Search from "./forms/Search";
import client from "../utils/client";
import { useCart } from "../context/cart";

const NavBar = () => {
  const [auth, setAuth] = useAuth();
  useCart();
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("auth");
    await client.get("/logout");
    setAuth({ ...auth, user: null, token: null });
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/")}>
            Home
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/shop")}>
            shop
          </button>
        </li>
        <li className="nav-item">
          <Search />
        </li>
        <li className="nav-item">
          <button className="nav-link active" onClick={() => navigate("/cart")}>
            Cart
          </button>
        </li>
        {!auth?.user ? (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
