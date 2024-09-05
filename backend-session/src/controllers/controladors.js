import { newConnection } from "../db/database.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const conexion = await newConnection();
  const [user] = await conexion.query(
    "Select * from users where username = ? AND password = ?",
    [username, password]
  );
  const usuario = user[0];

  if (usuario) {
    // Guardar información del usuario en la sesión
    req.session.userId = usuario.id;
    req.session.username = usuario.username;

    return res.json({
      message: "Inicio de sesión exitoso",
      user: { id: user.id, username: user.username },
    });
  } else {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }
};

export const session = (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No hay sesión activa" });
  }
};

export function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
}

export async function register(req, res) {
  const { username, password } = req.body;
  const conexion = await newConnection();

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await conexion.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (existingUser.length > 0) {
      // Si ya existe, retornar error 409
      return res.status(409).json({
        message: "El nombre de usuario ya existe, por favor elija otro",
      });
    }

    // Si no existe, insertar el nuevo usuario
    const [newUser] = await conexion.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );

    // Retornar éxito
    return res
      .status(201)
      .json({ message: "Usuario creado correctamente", data: newUser });
  } catch (error) {
    console.error("Error al registrar usuario: ", error);
    return res.status(500).json({ message: "Error del servidor" });
  } finally {
    await conexion.end(); // Asegúrate de cerrar la conexión
  }
}
