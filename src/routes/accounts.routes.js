import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import signupFormSubmit from "../schemas/signupSchema.js";

import { signUp, signIn } from "../controllers/account.js";

//remove later
import db from "../database.js";
import bcrypt from "bcrypt"
import signinFormSubmit from "../schemas/signinSchema.js";
// until here.

const router = Router();

router.post('/cadastro', validateBodySchema(signupFormSubmit), signUp);
router.post('/', validateBodySchema(signinFormSubmit), signIn);

export default router;