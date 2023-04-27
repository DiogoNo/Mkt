import Product from "../../models/product.js";

export const validateCreate = async (fields) => {
    const MAX_FILE_SIZE_MB = 2;
    const { name,description,price,category,quantity,shipping,photo } = fields;
    const validations = [
      () => !name.trim() && "Name is required",
      () => !description.trim() && "description is required",
      () => !price.trim() && "price is required",
      () => !category.trim() && "category is required",
      () => !quantity.trim() && "quantity is required",
      () => !shipping.trim() && "shipping is required",
      () => !(photo && photo.size > MAX_FILE_SIZE_MB * 1024 * 1024) && "Invalid image size",  
      async () => {   
          const existingProduct = await Product.findOne({ name });  
          return existingProduct && "Already exist"
          }
        ];
    console.log(validations)
    const errors = await Promise.all(validations.map((validation) => validation()));    
    return errors.filter((error) => error);
};

