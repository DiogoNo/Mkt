import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Home() {
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
        <div key={product._id}>
          <div>{product.name}</div>
          <div>{moment(product.createdAt).fromNow()}</div>
          <div>{product.sold}</div>
        </div>
      ))}
    </div>
  );
}
