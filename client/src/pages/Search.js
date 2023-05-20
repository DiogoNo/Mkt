import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/search";

const Search = () => {
  const [values] = useSearch();

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div>
            {values?.result?.map((product) => (
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
export default Search;
