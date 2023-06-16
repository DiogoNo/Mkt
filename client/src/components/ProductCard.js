import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
const ProductCard = ({ product, list, isCart, isOrder }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const removeCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div key={product._id}>
      <img
        src={`${process.env.REACT_APP_API}/product/photo/${
          product._id
        }?${new Date().getTime()}`}
        alt={product.name}
        className="img img-responsive"
        height="100px"
      />
      <div>{product.name}</div>
      <div>{product.price}</div>
      {!isCart && (
        <div className="d-flex justify-content-between">
          {list && (
            <button
              className="btn btn-primary col card-button"
              onClick={() => navigate(`/product/${product.slug}`)}
            >
              View Product
            </button>
          )}
          {!isOrder && (
            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Adicionado ao carrinho");
              }}
              className="btn btn-secondary col card-button"
            >
              AddCart
            </button>
          )}
        </div>
      )}
      {isCart && (
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger col card-button"
            onClick={() => {
              removeCart(product._id);
            }}
          >
            removect
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
