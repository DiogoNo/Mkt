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
    <div style={{ maxWidth: "300px" }} key={product._id}>
      <img
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.slug}`)}
        src={`${process.env.REACT_APP_API}/product/photo/${
          product._id
        }?${new Date().getTime()}`}
        alt={product.name}
        className="img img-responsive w-100"
        height="400px"
      />
      <div className="d-flex justify-content-between">
        <div style={{ cursor: "default" }}>
          <p
            style={{ color: "#a46080", fontWeight: "bolder" }}
            className="fs-3 m-1"
          >
            {product.name}
          </p>
          <p
            style={{ color: "#a46080", fontWeight: "bold" }}
            className="fs-5 m-1"
          >
            R$ {product.price}
          </p>
        </div>
        <div className="align-self-center">
          {!isCart ? (
            !isOrder && (
              <svg
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify([...cart, product])
                  );
                  toast.success("Adicionado ao carrinho");
                }}
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-bag-heart-fill"
                viewBox="0 0 16 16"
                color="#a46080"
              >
                <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
              </svg>
            )
          ) : (
            <svg
              onClick={() => {
                removeCart(product._id);
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-bag-x-fill"
              viewBox="0 0 16 16"
              color="#a46080"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293 6.854 8.146z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
