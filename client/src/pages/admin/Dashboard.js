import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="App">
      <p>dashboard aaaa</p>
    </div>
  );
};

export default AdminDashboard;
