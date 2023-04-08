import { useAuth } from "../context/auth";

const Home = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div className="App">
      <p></p>
    </div>
  );
};

export default Home;
