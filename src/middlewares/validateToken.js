import Joi from "joi";
import db from "../database.js";

async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    if(!authorization) return res.sendStatus(401);

    const token = authorization.replace("Bearer ", "").trim(); 
    
    const validation = Joi.string().uuid().required().validate(token);
    if(validation.error) return res.sendStatus(401);

    const tokenSearch = await db.collection("Sessions").findOne({token}); 
    if(!tokenSearch) return res.sendStatus(404) // not found token on database 
    
    req.headers.authorization = token; // replace BEARER <token> for just token.
    next()
}

export default validateToken;