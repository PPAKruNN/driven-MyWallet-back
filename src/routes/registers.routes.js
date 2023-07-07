import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import validateToken from "../middlewares/validateToken.js";
import registerSchema from "../schemas/registerSchema.js";

import { getRegisters, newRegister } from "../controllers/registers.js";

const router = Router();

router.post("/nova-transacao/:tipo", validateBodySchema(registerSchema), validateToken, newRegister);
router.get("/registros", validateToken, getRegisters);
// router.delete()
// router.put()
export default router;