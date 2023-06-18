import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Search from "./../forms/Search";
import client from "../../utils/client";
import { useCart } from "../../context/cart";
import marca from "../../common/images/marca.jpg";
import { useState } from "react";
import { ReactComponent as Kebab } from "../../assets/svg/kebab.svg";
import { ReactComponent as Sacola } from "../../assets/svg/sacola.svg";

const NavBar = () => {
  const [auth, setAuth] = useAuth();
  const [menu, setMenu] = useState(false);
  useCart();
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("auth");
    await client.get("/logout");
    setAuth({ ...auth, user: null, token: null });
    navigate("/login");
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button className="nav-link active m-3" onClick={() => setMenu(!menu)}>
          <Kebab />
        </button>

        <button className="nav-link active m-3" onClick={() => navigate("/")}>
          <img
            height="50"
            className="img img-responsive w-100"
            src={marca}
            alt="marca"
          />
        </button>

        <button
          className="nav-link active m-3"
          onClick={() => navigate("/cart")}
        >
          <Sacola />
        </button>
      </div>

      <div
        className="nav-transitions"
        style={{
          maxHeight: menu ? "150px" : "0",
          overflow: "hidden",
          transitionDuration: "250ms",
          transitionProperty: "max-height",
        }}
      >
        <nav className=" navbar ">
          <ul className=" navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="nav-link active"
                onClick={() => navigate("/shop")}
              >
                shop
              </button>
            </li>
            <li className="nav-item">
              <Search />
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
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
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
      </div>
    </div>
  );
};

export default NavBar;
