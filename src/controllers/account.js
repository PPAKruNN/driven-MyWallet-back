import db from "../database.js";
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

export async function signUp (req, res)  {
    const { name, email, password } = req.body;

    const emailSearch = await db.collection("Users").findOne({email: email});
    if(emailSearch) return res.sendStatus(409);
    
    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = await db.collection("Users").insertOne({
        name,
        email,
        password: passwordHash
    })

    await db.collection("UsersRegisters").insertOne({
        userId: newUser.insertedId,
        data: [] 
    })

    return res.sendStatus(201); 
}

export async function signIn (req, res)  {
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

export async function getProfile(req, res) {
    
    try {
        const userSession = await db.collection("Sessions").findOne({token: req.headers.authorization});
        const userInfo = await db.collection("Users").findOne({_id: userSession.userId});
    } catch (error) {
        return res.sendStatus(500);
    }
    
    delete userInfo.password;
    res.send(userInfo);
}