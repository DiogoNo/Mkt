import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import client from "../../utils/client";

const AdminProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await client.get("/categories");
      if (data) {
        setCategories(data);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("price", price);

      const { data } = await client.post(`/product`, productData);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Criado");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Erro ao Criar");
    }
  };

  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/products">
        Products
      </NavLink>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          {photo && (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="productPhoto"
                className="img img-responsive"
                height="100px"
              />
            </div>
          )}
          <select
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          >
            <option>Please choose one option</option>
            {categories.map((option) => {
              return (
                <option value={option._id} key={option._id}>
                  {option.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            className="form-control p-3"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            className="form-control p-3"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            className="form-control p-3"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            className="form-control p-3"
            placeholder="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            onChange={(event) => {
              setShipping(event.target.value);
            }}
          >
            <option value="0">no</option>
            <option value="1">yes</option>
          </select>
          <button className="btn btn-primary" type="submit">
            {"Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProduct;
