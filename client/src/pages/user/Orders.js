import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useEffect, useState } from "react";
import client from "../../utils/client";
import moment from "moment";
import ProductCard from "../../components/ProductCard";

const UserOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await client.get("/orders");
      setOrders(data);
    } catch (error) {}
  };

  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/user/profile">
        Profile
      </NavLink>
      <div>
        {orders.map((order, index) => {
          return (
            <div key={order._id}>
              <table className="border shadow bg-light rounded-4 mb-2">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">quando foi</th>
                    <th scope="col">pagamento</th>
                    <th scope="col">quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{order?.status}</td>
                    <td>{order?.buyer?.name}</td>
                    <td>{moment(order?.createdAt).fromNow()}</td>
                    <td>{order?.buyer?.status ? "Success" : "Waiting"}</td>
                    <td>{order?.products?.length}</td>
                  </tr>
                </tbody>
              </table>

              {order?.products.map((product, i) => (
                <ProductCard key={i} isOrder product={product}></ProductCard>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrders;
