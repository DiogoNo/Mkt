import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      setValues({ ...values, result: data });
      navigate("search");
    } catch (error) {}
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control"
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        value={values?.keyword}
      />
      <button type="submit" className="btn btn-outline-primary">
        Search
      </button>
    </form>
  );
};

export default Search;
