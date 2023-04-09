import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const NavBar = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: null });
    navigate("/login");
  };

  return (
    <nav className="navbar bg-body-tertiary">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">
            Home
          </a>
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
