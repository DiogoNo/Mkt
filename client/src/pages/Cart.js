import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart] = useCart();
  return (
    <div>
      {cart.map((c, index) => (
        <div key={c._id + index}>
          <ProductCard product={c} isCart />
        </div>
      ))}
    </div>
  );
};

export default Cart;
