import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Product = () => {
  const [product, setProduct] = useState({});
  const [productsRelated, setProductsRelated] = useState([]);
  const [loading, setLoading] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      loadProduct();
    }
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product/${params?.slug}`);
      setProduct(data);
      loadRelatedProduct(data._id, data.category._id);
      setLoading(false);
    } catch (error) {}
  };

  const loadRelatedProduct = async (product, category) => {
    try {
      const { data } = await axios.get(`/products/${product}/${category}`);
      setProductsRelated(data);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        {!loading && (
          <div className="container-fluid">
            {product && <ProductCard product={product} />}
          </div>
        )}
      </div>
      <div>
        {productsRelated?.map((p) => (
          <div key={p._id}>
            <ProductCard list product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;
