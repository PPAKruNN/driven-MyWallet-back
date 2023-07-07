import Joi from "joi";

const registerSchema = Joi.object({
    tipo: Joi.string().trim().valid("entrada", "saida").required(),
    registerLabel: Joi.string().required().trim(),
    value: Joi.number().required().min(0)
}) 

export default registerSchema;