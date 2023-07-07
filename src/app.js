import { json } from "express";
import Express from 'express';
import cors from cors;

import { router as accountsRouter } from "./routes/accounts.routes";

const app = Express();
app.use(cors());
app.use(json());
app.use(accountsRouter)

app.listen(5000, () => {
    console.log("Listening on 5000");
})


// DATABASE STRUCTURE

// User = {
//     _id,
//     name, 
//     email,
//     passwordHash, 
// }

// Session = {
//     user_id: UUID_TOKEN
// }

// UserRegisters (Collection) = {
//     userId: new ObjectId(user._id),
//     data: [] (Array of registers)
// }

// register = {
//     type: "entrada" / "saida",
//     registerLabel: "Compras churrasco",
//     value: "500" (R$)
// }