import db from "../database.js";

export async function newRegister (req,res) {
    try {
        const userSession = await db.collection("Sessions").findOne({token: req.headers.authorization});
        const userRegisters = await db.collection("UsersRegisters").findOne({userId: userSession.userId})
        const currRegisters = userRegisters.data;
    
        currRegisters.push({
            type: req.params.tipo,
            registerLabel: req.body.registerLabel,
            value: req.body.value,
            timestamp: Date.now() 
        })
    
        await db.collection("UsersRegisters").updateOne(
            {userId: userSession.userId}, 
            {$set: {data: currRegisters}}     
        )

        res.send(currRegisters);
        
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function getRegisters (req, res) {
    try {
        const userSession = await db.collection("Sessions").findOne({token: req.headers.authorization});
        const userRegisters = await db.collection("UsersRegisters").findOne({userId: userSession.userId});
        return res.send(userRegisters.data);
    } catch (error) {
        return res.sendStatus(500); 
    }
} 