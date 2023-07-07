import Joi from "joi";

const signinFormSubmit = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim()
}) 

export default signinFormSubmit;