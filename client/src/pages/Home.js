import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState();

  const loadproducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {}
  };

  useEffect(() => {
    loadproducts();
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <div className="card mb-3" key={product._id}>
          <ProductCard params={product} />
        </div>
      ))}
    </div>
  );
};
export default Home;
