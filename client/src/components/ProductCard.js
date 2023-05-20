import { useNavigate } from "react-router-dom";
const ProductCard = ({ product, list }) => {
  const navigate = useNavigate();
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
      <div className="d-flex justify-content-between">
        {list && (
          <button
            className="btn btn-primary col card-button"
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            View Product
          </button>
        )}
        <button className="btn btn-secondary col card-button">AddCart</button>
      </div>
    </div>
  );
};

export default ProductCard;
