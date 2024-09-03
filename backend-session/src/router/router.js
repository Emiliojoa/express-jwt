import { Router } from "express";
import { login, logout, registro } from "../controllers/controladors.js";

const router = Router();
// Ruta para manejar el inicio de sesión
router.post("/login", login);
// Ruta para obtener los datos de la sesión
router.get("/session", registro);

router.post("/logout", logout);

export { router };
