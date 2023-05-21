import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth({});
  const navigate = useNavigate();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => (total += item.price));
    return total;
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
      {cart.map((c, index) => (
        <div key={c._id + index}>
          <ProductCard product={c} isCart />
        </div>
      ))}
    </div>
  );
};

export default Cart;
