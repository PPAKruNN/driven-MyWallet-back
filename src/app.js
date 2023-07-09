import { json } from "express";
import Express from 'express';
import cors from "cors";
import accountsRouter from "./routes/accounts.routes.js";
import registersRouter from "./routes/registers.routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = Express();
app.use(cors());
app.use(json());
app.use(accountsRouter);
app.use(registersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on 5000");
})


// DATABASE STRUCTURE
// User = {
//     _id,
//     name, 
//     email,
//     password, 
// }

// Session = {
//     userId,
//     token: UUID_TOKEN
// }

// UsersRegisters (Collection) = {
//     userId: new ObjectId(user._id),
//     data: [] (Array of registers)
// }

// register = {
//     type: "entrada" / "saida",
//     registerLabel: "Compras churrasco",
//     value: "500" (R$)
//     timestamp: miliseconds
// }
