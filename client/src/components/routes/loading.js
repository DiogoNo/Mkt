import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Loading = ({ path = "login" }) => {
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate(`/${path}`, { state: location.pathname });
    return () => clearInterval(interval);
  }, [count]);

  return <div></div>;
};

export default Loading;
