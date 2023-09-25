const User = require("../models/userSchema.js");

  const register = async (req, res) => {
    const { nombre, username, password } = req.body;
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

  module.exports = {
    register
  }