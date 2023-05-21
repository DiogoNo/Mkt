import axios from "axios";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("categories");
      setCategories(data);
    } catch (error) {}
  };

  return { categories };
};
export default useCategory;
