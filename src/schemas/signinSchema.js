import Joi from "joi";

const signinFormSubmit = Joi.object({
    name: Joi.string().required().trim(),
    password: Joi.string().required().trim()
}) 

export default signinFormSubmit;