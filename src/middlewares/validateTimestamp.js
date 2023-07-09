import Joi from "joi";
import db from "../database.js";

async function validateTimestamp(req, res, next) {
    const { timestamp } = req.headers;

    if(!timestamp) return res.sendStatus(401);
    const validation = Joi.number().integer().required().positive().validate(timestamp);
    if(validation.error) return res.status(401).send(validation.error);

    const userRegisters = await db.collection("UsersRegisters").findOne({userId: res.locals.userSession.userId});
    const currRegisters = userRegisters.data;

    const index = currRegisters.findIndex( (curr) => {
        return curr.timestamp === parseInt(timestamp);
    });
    if(index === -1) return res.status(404).send("Timestamp not found");

    res.locals.registers = currRegisters;
    res.locals.currRegister = currRegisters[index];
    res.locals.currRegisterIndex = index;
    
    next()
}

export default validateTimestamp;
