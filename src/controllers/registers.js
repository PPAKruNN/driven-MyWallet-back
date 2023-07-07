import db from "../database.js";

export async function newRegister (req,res) {
    const userSession = await db.collection("Sessions").findOne({token: req.headers.authorization});
    const userRegisters = await db.collection("UsersRegisters").findOne({userId: userSession.userId})
    const currRegisters = userRegisters.data;
    
    currRegisters.push({
        type: req.params.tipo,
        registerLabel: req.body.registerLabel,
        value: req.body.value
    })
    
    await db.collection("UsersRegisters").updateOne(
        {userId: userSession.userId}, 
        {$set: {data: currRegisters}}     
    )

    res.sendStatus(200);
}