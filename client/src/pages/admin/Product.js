import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const AdminProduct = () => {
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [descr, setDescr] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");

  console.log(photo);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      if (data) {
        setCategories(data);
      }
    } catch (error) {}
  };

  return (
    <div className="App">
      <NavLink className="nav-link" to="/dashboard/admin">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/category">
        CreateCategory
      </NavLink>

      <div>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </div>

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
        {categories.map((option, index) => {
          return <option key={index}>{option.name}</option>;
        })}
      </select>
    </div>
  );
};

export default AdminProduct;
