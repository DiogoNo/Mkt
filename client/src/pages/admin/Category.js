import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const AdminCategory = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      if (data) {
        setCategories(data);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/category`, {
        name,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        loadCategories();
        toast.success("Criado");
      }
    } catch (error) {
      toast.error("Erro ao Criar");
    }
  };

  return (
    <div className="App w-auto">
      <NavLink className="nav-link" to="/dashboard/admin">
        Home
      </NavLink>
      <NavLink className="nav-link" to="/dashboard/admin/product">
        CreateProduct
      </NavLink>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control p-3"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <>
        {!loading ? (
          <div className="col ">
            {categories?.map((category) => (
              <button
                key={category._id}
                className="btn btn-outline-primary m-3"
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : (
          <div>loading</div>
        )}
      </>
    </div>
  );
};

export default AdminCategory;
