import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import validateToken from "../middlewares/validateToken.js";
import registerSchema from "../schemas/registerSchema.js";

import { deleteRegister, getRegisters, newRegister, putRegister } from "../controllers/registers.js";
import validateTimestamp from "../middlewares/validateTimestamp.js";

const router = Router();

router.post("/nova-transacao/:tipo", validateBodySchema(registerSchema), validateToken, newRegister);
router.get("/registros", validateToken, getRegisters);
router.delete("/registros", validateToken, validateTimestamp, deleteRegister);
router.put("/registros", validateBodySchema(registerSchema), validateToken, validateTimestamp, putRegister);

export default router;