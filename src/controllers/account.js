import db from "../database.js";
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

async function signUp (req, res)  {
    const { name, email, password } = req.body;

    const emailSearch = await db.collection("Users").findOne({email: email});
    if(emailSearch) return res.sendStatus(409);
    
    const passwordHash = bcrypt.hashSync(password, 10);

    await db.collection("Users").insertOne({
        name,
        email,
        password: passwordHash
    })

    return res.sendStatus(201); 
}

async function signIn (req, res)  {
    const { email, password } = req.body;

    const emailSearch = await db.collection("Users").findOne({email: email});
    if(!emailSearch) return res.sendStatus(404);
    
    const passwordVerify = bcrypt.compareSync(password, emailSearch.password);
    if(!passwordVerify) return res.sendStatus(401);
    
    const newToken = uuid();
    const haveToken = await db.collection("Sessions").findOne({userId: new ObjectId(emailSearch._id) })

    if(!haveToken) {          
        await db.collection("Sessions").insertOne({
            userId: new ObjectId(emailSearch._id),
            token: newToken   
        })
    } else {
        await db.collection("Sessions").updateOne(
            { userId: new ObjectId(emailSearch._id) },
            { $set: {token: newToken} }
        )
    }
    
    return res.status(200).send(newToken);
}


export { signUp, signIn };