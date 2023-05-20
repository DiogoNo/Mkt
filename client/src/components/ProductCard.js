import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import moment from "moment";

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
      <div>{moment(params.createdAt).fromNow()}</div>
      <div>{params.sold}</div>
    </div>
  );
};

export default ProductCard;
