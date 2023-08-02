import Joi from "joi";

export const createDataValidation = Joi.object({
  item_number: Joi.number(),
  description: Joi.string(),
  unit: Joi.string(),
  qty:Joi.string(),
  rate:Joi.string(),
  amount:Joi.string()
});
