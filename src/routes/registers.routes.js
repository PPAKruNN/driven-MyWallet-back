import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import validateToken from "../middlewares/validateToken.js";
import registerSchema from "../schemas/registerSchema.js";

import { deleteRegister, getRegisters, newRegister } from "../controllers/registers.js";
import deleteRegisterSchema from "../schemas/deleteRegisterSchema.js";

const router = Router();

router.post("/nova-transacao/:tipo", validateBodySchema(registerSchema), validateToken, newRegister);
router.get("/registros", validateToken, getRegisters);
router.delete("/registros", validateBodySchema(deleteRegisterSchema),  validateToken, deleteRegister)
// router.put()

export default router;