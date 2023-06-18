import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../../../utils/client";
import "./index.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.post(`/login`, {
        email,
        password,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Logado");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (error) {
      toast.error("Erro ao Logar");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <form onSubmit={handleSubmit}>
        <p style={{ fontSize: "8px" }} className="m-1">
          E-MAIL
        </p>
        <input
          type="email"
          className="fieldSettings mb-3 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p style={{ fontSize: "8px" }} className="m-1">
          SENHA
        </p>
        <input
          type="password"
          className="fieldSettings mb-5 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn border w-100"
          style={{ color: "#000000", fontSize: "8px" }}
          onClick={() => navigate("/register")}
        >
          CADASTRE-SE
        </button>

        <button
          style={{
            fontSize: "8px",
          }}
          className="btn btn-primary mt-2 w-100"
          type="submit"
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
};

export default Login;
