import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const loadProduct = async (req, res) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products-category/${params?.slug}`);
      setProducts(data.products);
      setCategory(data.category);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (params?.slug) {
      loadProduct();
    }
  }, [params?.slug]);

  return (
    <div>
      <span>{category.name}</span>
      {!loading &&
        products?.map((p) => (
          <div key={p._id}>
            <ProductCard list product={p} />
          </div>
        ))}
    </div>
  );
};
export default Category;
