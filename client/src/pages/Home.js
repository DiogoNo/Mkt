import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    totalProducts();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadProductsPaginated();
  }, [page]);

  const loadProductsPaginated = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {}
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/${page}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {}
  };

  const totalProducts = async () => {
    try {
      const { data } = await axios.get("/products-count ");
      setCount(data);
    } catch (error) {}
  };

  return (
    <div>
      {products?.map((product) => (
        <div className="card mb-3" key={product._id}>
          <ProductCard params={product} />
        </div>
      ))}
      <div className="container-fluid">
        {products && products.length < count && (
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
            className="btn btn-primary"
          >
            {loading ? "loading" : "load more"}
          </button>
        )}
      </div>
    </div>
  );
};
export default Home;
