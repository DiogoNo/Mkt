import Category from "../../models/category.js";
export const validateCreate = async (fields) => {
  const { name } = fields;
  const validations = [
      () => !name.trim() && "Name is required",
      async () => {   
          const existingCategory = await Category.findOne({ name });
          return existingCategory && "Already exist"
          }
        ];
        const errors = await Promise.all(validations.map((validation) => validation()));
        return errors.filter((error) => error);
};

export const validateUpdate = async (fields) => {
  const { name } = fields;
  const validations = [
      () => !name.trim() && "Name is required",
      async () => {   
          const existingCategory = await Category.findOne({ name });
          return existingCategory && "Already exist"
          }
        ];
        const errors = await Promise.all(validations.map((validation) => validation()));
        return errors.filter((error) => error);
};