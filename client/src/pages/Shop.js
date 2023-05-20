import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { rangePrice } from "../utils/consts";
import { toast } from "react-hot-toast";

const Shop = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {}
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (error) {
      toast.error("Erro ao  Filtrar");
    }
  };

  const loadFielteredProducts = async () => {
    try {
      const { data } = await axios.post("/products-filtered", {
        checked,
        radio,
      });
      setProducts(data);
    } catch (error) {
      toast.error("Erro ao  Filtrar");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      loadFielteredProducts();
    } else {
      loadProducts();
    }
  }, [radio, checked]);

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChecked = (value, id) => {
    const all = [...checked];
    if (value) {
      all.push(id);
      setChecked(all);
    } else {
      setChecked(all.filter((category) => category !== id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="row">
            {categories?.map((category) => (
              <div key={category._id}>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleChecked(e.target.checked, category._id)
                    }
                  />
                  {category.name}
                </label>
              </div>
            ))}
          </div>
          <div className="row">
            {rangePrice.map((price) => (
              <div key={price._id}>
                <label>
                  <input
                    type="radio"
                    value={radio}
                    name="checkboxFilter"
                    onChange={(e) => {
                      return setRadio(price.array);
                    }}
                  />
                  {price.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-3">
          <div>
            {products?.map((product) => (
              <div className="card mb-3" key={product._id}>
                <ProductCard params={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
