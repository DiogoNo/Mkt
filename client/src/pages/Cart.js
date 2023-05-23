import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth({});
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const navigate = useNavigate();

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {}
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => (total += item.price));
    return total;
  };

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", { nonce, cart });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Pagamento realizado");
    } catch (error) {}
  };

  return (
    <div>
      <div>total price: {cartTotal()} </div>
      {auth?.user?.address ? (
        <div>
          <h5>{auth?.user?.address}</h5>
          <div>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              update address
            </button>
          </div>
        </div>
      ) : (
        <div>
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Add Delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-danger"
              onClick={() => navigate("/login", { state: "/cart" })}
            >
              login pa comprar
            </button>
          )}
        </div>
      )}
      <div>
        {JSON.stringify(clientToken)}
        {clientToken && cart && (
          <div>
            <DropIn
              options={{
                authorization: clientToken,
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            <button
              className="btn btn-outline-primary"
              onClick={() => handleBuy()}
            >
              Comprar
            </button>
          </div>
        )}
        ;
      </div>
      {cart.map((c, index) => (
        <div key={c._id + index}>
          <ProductCard product={c} isCart />
        </div>
      ))}
    </div>
  );
};

export default Cart;
