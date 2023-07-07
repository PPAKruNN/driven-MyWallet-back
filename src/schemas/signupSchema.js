import Joi from "joi";

const signupFormSubmit = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim()
}) 

export default signupFormSubmit;