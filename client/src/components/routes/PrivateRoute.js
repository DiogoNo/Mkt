import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/auth-check`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : "loading";
};

export default PrivateRoute;
