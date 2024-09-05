import { Router } from "express";
import { login, logout,  register,  session } from "../controllers/controladors.js";


export const router = Router();
// Ruta para manejar el inicio de sesión
router.post("/login", login);
// Ruta para obtener los datos de la sesión
router.get("/session", session);

router.post("/logout", logout);
router.post("/register", register)



