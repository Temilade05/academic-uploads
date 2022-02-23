import Joi from "joi";

const createCourseSchema = Joi.object({
  code: Joi.string().required().messages({
    "any.required": "course code is required",
  }),
  name: Joi.string(),
  description: Joi.string(),
});

export { createCourseSchema };
