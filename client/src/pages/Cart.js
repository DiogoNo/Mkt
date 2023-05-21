import ProductCard from "../components/ProductCard";
import { useCart } from "../context/cart";

const Cart = () => {
  const [cart] = useCart();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => (total += item.price));
    return total;
  };

  return (
    <div>
      <div>total price: {cartTotal()} </div>
      {cart.map((c, index) => (
        <div key={c._id + index}>
          <ProductCard product={c} isCart />
        </div>
      ))}
    </div>
  );
};

export default Cart;
