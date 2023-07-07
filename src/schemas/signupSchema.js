import Joi from "joi";

const signupFormSubmit = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string().min(3).required().trim()
}) 

export default signupFormSubmit;