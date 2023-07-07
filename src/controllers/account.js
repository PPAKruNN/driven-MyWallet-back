import db from "../database.js";
import bcrypt from "bcrypt"

async function signUp (req, res)  {
    const { name, email, password } = req.body;

    const emailSearch = await db.collection("Users").findOne({email: email});
    if(emailSearch) return res.sendStatus(409);
    
    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("Users").insertOne({
        name,
        email,
        passwordHash
    })

    return res.sendStatus(201); 
}

export { signUp };