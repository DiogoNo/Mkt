import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const AdminProductUpdate = () => {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const [photo, setPhoto] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params?.slug}`);
      if (data) {
        setId(data._id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category._id);
        setShipping(data.shipping);
        setQuantity(data.quantity);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      photo && productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("category", category);
      productData.append("shipping", shipping === "1" ? true : false);
      productData.append("quantity", quantity);
      productData.append("price", price);

      const { data } = await axios.put(`/product/${id}`, productData);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Editado");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Erro tentar dar o update");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/product/${id}`);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        toast.success("Deletado");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Erro tentar deletar");
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
        <form onSubmit={handleUpdate}>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          {photo ? (
            <div>
              <img
                src={URL.createObjectURL(photo)}
                alt="productPhoto"
                className="img img-responsive"
                height="100px"
              />
            </div>
          ) : (
            id && (
              <div>
                <img
                  src={`${
                    process.env.REACT_APP_API
                  }/product/photo/${id}?${new Date().getTime()}`}
                  alt="productPhoto"
                  className="img img-responsive"
                  height="100px"
                />
              </div>
            )
          )}
          <select
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            value={category}
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
            placeholder="descriptioniçao"
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
            {"Update"}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            {"Delete"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
