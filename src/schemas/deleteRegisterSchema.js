import Joi from "joi";

const deleteRegisterSchema = Joi.object({
    registerLabel: Joi.string().required().trim(),
    timestamp: Joi.number().integer().required().positive(),
}) 

export default deleteRegisterSchema;