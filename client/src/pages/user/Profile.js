import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import client from "../../utils/client";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address } = auth?.user;
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await client.put("/profile", {
        name,
        password,
        address,
      });
      toast.success("Profile updated");

      if (data?.error) {
        toast.error("Erro ao atualizar");
      } else {
        setAuth({ ...auth, user: data });
        const ls = JSON.stringify(localStorage.getItem("auth"));
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
      }
    } catch (error) {}
  };

  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/user">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/user/orders">
        Orders
      </NavLink>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            autoFocus={true}
          />
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            autoFocus={true}
          />
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoFocus={true}
          />
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
            autoFocus={true}
          />
          <button className="btn btn-primary" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
