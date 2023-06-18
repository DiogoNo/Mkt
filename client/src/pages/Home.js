import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import useCategory from "../hooks/useCategory";
import client from "../utils/client";
import { ReactComponent as Morepage } from "../assets/svg/morepage.svg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { categories } = useCategory();

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
      const { data } = await client.get(`/products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {}
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await client.get(`/products/${page}`);
      setProducts(data);
      setLoading(false);
    } catch (error) {}
  };

  const totalProducts = async () => {
    try {
      const { data } = await client.get("/products-count ");
      setCount(data);
    } catch (error) {}
  };

  return (
    <div>
      {/* <div className="d-flex justify-content-center wm-100">
        {categories?.map((c) => (
          <a
            className="m-1 fs-4"
            style={{ color: "#a46080", fontWeight: "bolder" }}
            key={c._id}
            href={`/category/${c.slug}`}
          >
            {c.name}
          </a>
        ))}
      </div> */}
      <div className="container-fluid ">
        <div className="row row-cols-auto d-flex justify-content-center">
          {products?.map((product) => (
            <div className=" col m-4 " key={product._id}>
              <ProductCard list product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid d-flex justify-content-center mb-5">
        {products && products.length < count && (
          <Morepage
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Home;
