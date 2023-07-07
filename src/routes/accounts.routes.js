import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import signupFormSubmit from "../schemas/signupSchema.js";
import signinFormSubmit from "../schemas/signinSchema.js";

import { signUp, signIn, getProfile } from "../controllers/account.js";
import validateToken from "../middlewares/validateToken.js";

const router = Router();

router.post('/', validateBodySchema(signinFormSubmit), signIn);
router.post('/cadastro', validateBodySchema(signupFormSubmit), signUp);
router.get("/usuarioInfo", validateToken, getProfile)
export default router;