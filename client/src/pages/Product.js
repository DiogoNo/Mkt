import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product/${params?.slug}`);
      setProduct(data);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <div className="container-fluid">
      {product && !loading && <ProductCard product={product} />}
    </div>
  );
};
export default Product;
