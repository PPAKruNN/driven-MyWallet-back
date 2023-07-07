import { Router } from "express";
import validateBodySchema from "../middlewares/validateBodySchema.js";
import signupFormSubmit from "../schemas/signupSchema.js";

import { signUp } from "../controllers/account.js";


const router = Router();

router.post('/cadastro', validateBodySchema(signupFormSubmit), signUp)

export default router;