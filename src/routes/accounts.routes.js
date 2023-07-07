import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import signupFormSubmit from "../schemas/signupSchema.js";
import signinFormSubmit from "../schemas/signinSchema.js";

import { signUp, signIn } from "../controllers/account.js";

const router = Router();

router.post('/cadastro', validateBodySchema(signupFormSubmit), signUp);
router.post('/', validateBodySchema(signinFormSubmit), signIn);

export default router;