import Joi from "joi";

const createImageSchema = Joi.object({
  session: Joi.string().required().messages({
    "any.required": "session is required",
  }),

  courseCode: Joi.string().required().messages({
    "any.required": "courseCode is required",
  }),
});

const updateImageSchema = Joi.object({
  session: Joi.string(),
  courseCode: Joi.string(),
});

export { createImageSchema, updateImageSchema };
