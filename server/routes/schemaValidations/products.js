import { Joi, celebrate } from 'celebrate';

export const productSchema = () => {
  return celebrate(
    {
      body: Joi.object().keys({
        fields: {
          name: Joi.string().required(),
          descrption: Joi.required(),
          price: Joi.number().required(),
          category: Joi.required(),
          quantity: Joi.number().required()
        },
        files: {
          photo: Joi.object().keys({
            size: Joi.required()
          })
        }
      })
    },
    { abortEarly: false }
  );
};
