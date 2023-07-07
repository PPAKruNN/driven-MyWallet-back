import Joi from "joi";

const registerSchema = Joi.object({
    type: Joi.string().required.trim().valid(["entrada", "saida"]),
    registerLabel: Joi.string().required().trim(),
    value: Joi.number().required().min(0)
}) 

export default registerSchema;