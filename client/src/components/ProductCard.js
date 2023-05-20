const ProductCard = ({ params }) => {
  return (
    <div key={params._id}>
      <img
        src={`${process.env.REACT_APP_API}/product/photo/${
          params._id
        }?${new Date().getTime()}`}
        alt={params.name}
        className="img img-responsive"
        height="100px"
      />
      <div>{params.name}</div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary col card-button">
          View Product
        </button>
        <button className="btn btn-secondary col card-button">AddCart</button>
      </div>
    </div>
  );
};

export default ProductCard;
