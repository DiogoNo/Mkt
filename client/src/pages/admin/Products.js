import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      if (data) {
        setProducts(data);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {}
  };
  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/product">
        Create Product
      </NavLink>

      {!loading &&
        products?.map((product) => (
          <Link
            key={product._id}
            to={`/dashboard/admin/product/update/${product.slug}`}
          >
            <div className="card m-3">{product?.name}</div>
          </Link>
        ))}
    </div>
  );
};

export default AdminProducts;
