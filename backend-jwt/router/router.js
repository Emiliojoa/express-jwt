import { Router } from "express";

import { verificarJwt } from "../middlewares/validar-jwt.js";
import { login, logout, session } from "../controllers/controllers.js";
export const loginRouter = Router();

loginRouter.post("/login", login);

// Endpoint para validar la sesión
loginRouter.get("/session", verificarJwt, session);

// Endpoint de cierre de sesión (logout)
loginRouter.post("/logout", logout);
