const User = require("../models/userSchema.js");

const getAllUsers = async (req, res) => {
  // find es un metodo 
  const users = await User.find();
  try {
    if (!users) {
      return res.status(404).json({
        mensaje: "Usuarios no encontrados",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuarios encontrados",
      status: 200,
      users,
    });
  } catch (error) {
    // error de servidor 500
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

  const register = async (req, res) => {
    const { nombre, username, password, repassword } = req.body;
    const user = await User.findOne({ username });
    try {
      if (user) {
        return res.status(400).json({
          mensaje: "El usuario ya existe",
          status: 400,
        });
      }
  
      const newUser = new User({
        nombre,
        username,
        password,
        repassword
      });
  
      await newUser.save();
      res.status(201).json({
        mensaje: "Usuario creado exitosamente",
        status: 201,
        newUser,
      });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500,
      });
    }
  };

  
const changeToAdmin = async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;
  const user = await User.findById(id);
  try {
    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    user.rol = rol;
    await user.save();
    res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      status: 200,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

  module.exports = {
    getAllUsers,
    register,
    changeToAdmin
  }