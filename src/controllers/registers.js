import db from "../database.js";

export async function newRegister (req,res) {
    try {
        const userRegisters = await db.collection("UsersRegisters").findOne( {userId: res.locals.userSession.userId} )
        const currRegisters = userRegisters.data;

        currRegisters.push({
            type: req.params.tipo,
            registerLabel: req.body.registerLabel,
            value: req.body.value,
            timestamp: Date.now(),
            date: new Date().toUTCString()
        })
    
        await db.collection("UsersRegisters").updateOne(
            {userId: res.locals.userSession.userId}, 
            {$set: {data: currRegisters}}     
        )

        res.send(currRegisters);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getRegisters (req, res) {
    try {
        const userRegisters = await db.collection("UsersRegisters").findOne({userId: res.locals.userSession.userId});
        return res.send(userRegisters.data);
    } catch (error) {
        return res.sendStatus(500); 
    }
} 

export async function deleteRegister(req, res) {
    
    try {
        const userRegisters = await db.collection("UsersRegisters").findOne({userId: res.locals.userSession.userId});
        const registers = res.locals.registers;

        registers.splice(res.locals.currRegisterIndex, 1);

        await db.collection("UsersRegisters").updateOne(
            {userId: res.locals.userSession.userId}, 
            {$set: {data: registers}}     
        )

        return res.send(registers);

    } catch (error) {
        return res.status(500).send(error); 
    }
}

export async function putRegister (req, res) {
    try {
        const { tipo, registerLabel, value, timestamp } = req.body
        const newRegister = {
            type: tipo,
            registerLabel,
            value,
            timestamp,
            date
        }
        
        const registers = res.locals.registers;
        registers[res.locals.currRegisterIndex] = newRegister;

        await db.collection("UsersRegisters").updateOne(
            {userId: res.locals.userSession.userId}, 
            {$set: {data: registers}}     
        )

        return res.send(registers);
    } catch (error) {
        return res.status(500).send(error) 
    }
}
