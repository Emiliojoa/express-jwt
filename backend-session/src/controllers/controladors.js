import { pool } from "../db/database.js";


export async function login(req, res) {
  const { username, password } = req.body;
  const db = pool;

  try {
    const client = await db.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    client.release();

    if (result.rows.length > 0) {
      // Guardar información del usuario en la sesión
      req.session.userId = result.rows[0].id;
      req.session.username = result.rows[0].username;

      return res.json({
        message: "Inicio de sesión exitoso",
        user: { id: result.rows[0].id, username: result.rows[0].username },
      });
    } else {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
}

export async function registro(req, res) {
  const { username, password } = req.body;
  // Try to create a new user
  try {
    const newUser = await userService.createUser({
      username,
      password,
    });
    // If the user already exists
    if (newUser instanceof Error) {
      return res.status(400).json({ message: newUser.message });
    }
    // If the user is created
    res.status(201).json({
      message: "Usuario creado correctamente",
      data: newUser,
    });
    // If there is an error
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

export async function logout(req, res) {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid"); // Nombre de cookie por defecto para express-session
    return res.json({ message: "Sesión cerrada exitosamente" });
  });
}
