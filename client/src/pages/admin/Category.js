import axios from "axios";
import { Suspense, lazy, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const CategoryForm = lazy(() => import("../../components/forms/CategoryForm"));

const AdminCategory = () => {
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/category/${category._id}`, {
        name: updateName,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setUpdateName("");
        setCategory(null);
        loadCategories();
        setVisible(false);
        toast.success("Editado");
      }
    } catch (error) {
      toast.error("Erro ao Editadar");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/category/${category._id}`);

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setCategory(null);
        loadCategories();
        setVisible(false);
        toast.success("Deletado");
      }
    } catch (error) {
      toast.error("Erro ao Deletar");
    }
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
      <NavLink className="nav-link" to="/dashboard/admin/products">
        Products
      </NavLink>

      <Suspense fallback={"loading category form"}>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleSubmit}
        />
      </Suspense>

      <>
        {!loading ? (
          <div className="col ">
            {categories?.map((categ) => (
              <button
                key={categ._id}
                className="btn btn-outline-primary m-3"
                onClick={() => {
                  setCategory(categ);
                  setUpdateName(categ?.name);
                  setVisible(categ?.name === category?.name ? !visible : true);
                }}
              >
                {categ?.name}
              </button>
            ))}

            {visible && (
              <>
                <CategoryForm
                  value={updateName}
                  setValue={setUpdateName}
                  handleSubmit={handleUpdate}
                  edit
                  handleDelete={handleDelete}
                />
              </>
            )}
          </div>
        ) : (
          <div>loading</div>
        )}
      </>
    </div>
  );
};

export default AdminCategory;
