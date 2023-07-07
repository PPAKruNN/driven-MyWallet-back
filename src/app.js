import { json } from "express";
import Express from 'express';
import cors from "cors";
import accountsRouter from "./routes/accounts.routes.js";
import registersRouter from "./routes/registers.routes.js";

const app = Express();
app.use(cors());
app.use(json());
app.use(accountsRouter);
app.use(registersRouter);

app.listen(5000, () => {
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
// }