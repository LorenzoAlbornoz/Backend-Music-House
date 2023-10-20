const mongoose = require("mongoose");
const User = require("../models/userSchema.js");
const Product = require("../models/productSchema.js");

const {
  encryptPassword,
  comparePassword,
} = require("../utils/passwordHandler.js");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
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
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuario encontrado",
      status: 200,
      user
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500
    });
  }
};

  const register = async (req, res) => {
    const { name, username, password } = req.body;
    const user = await User.findOne({ username });
    try {
      if (user) {
        return res.status(400).json({
          mensaje: "El usuario ya existe",
          status: 400,
        });
      }
  
      const newUser = new User({
        name,
        username,
        password: encryptPassword(password),
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

  const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const secret = process.env.JWT_SECRET;
    try {
      if (!user) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado",
          status: 404,
        });
      }
      if (!comparePassword(password, user.password)) {
        return res.status(400).json({
          mensaje: "La contraseña es invalida",
          status: 400,
        });
      }
      const payload = {
        sub: user._id,
        email: user.username,
        name: user.name,
        rol: user.rol
      };
      const token = jwt.sign(payload, secret, {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: "12h"
      });
      return res.status(200).json({
        mensaje: "Inicio de sesión exitoso",
        status: 200,
        token
      });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500
      });
    }
  };

  const recoverPassword = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });
  
    try {
      if (!user) {
        return res.status(404).json({
          mensaje: "Usuario no encontrado",
          status: 404,
        });
      }
      return res.status(200).json({
        mensaje: "Se ha enviado un correo con instrucciones para recuperar la contraseña",
        status: 200,
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
  console.log(user)
  console.log(rol)
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }
    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    return res.status(200).json({
      mensaje: "Usuario borrado correctamente",
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


const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, password } = req.body;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        mensaje: "Id inválido",
        status: 400,
      });
    }
    if(req.body.password){
    const user = await User.findByIdAndUpdate(
      id,
      {
        ...req.body,
        name,
        username,
        password: encryptPassword(password)
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404
      });
    }

    return res.status(200).json({
      mensaje: "Usuario modificado correctamente",
      status: 200,
      user
    });
  }
  const user = await User.findByIdAndUpdate(
    id,
    {
      ...req.body,
      name,
      username
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
      status: 404
    });
  }

  return res.status(200).json({
    mensaje: "Usuario modificado correctamente",
    status: 200,
    user
  });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500
    });
  }
};

const addToFavorites = async (req, res) => {
  const { id } = req.params;
  const { productId,addToFavorites} = req.body 

  try {
    const user = await User.findById(id);
    const product = await Product.findById(productId);

    if (!user ) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    if (!product) {
      return res.status(400).json({
        mensaje: " no encontrado",
        status: 400,
      });
    }

    const isProductInFavorites = user.favorites.some((favProduct) =>
      favProduct.equals(product._id)
    );

    if (addToFavorites && !isProductInFavorites) {
      user.favorites.push(product);
      product.isFavorite = true;
    }

    else {
      user.favorites = user.favorites.filter(
        (favProduct) => !favProduct.equals(product._id)
      );
      product.isFavorite = false; 
    }

    await user.save();
    await product.save();

    res.status(200).json({
      mensaje: "Producto agregado a favoritos correctamente",
      status: 200,
      user,
    });
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      mensaje: "Hubo un error, inténtelo más tarde",
      status: 500,
    });
  }
};

const getFavoriteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
        status: 404,
      });
    }

    const favoriteProducts = await Product.find({ _id: { $in: user.favorites } });

    res.status(200).json({
      mensaje: "Lista de productos favoritos obtenida correctamente",
      status: 200,
      favoriteProducts,
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
    changeToAdmin,
    getUserByID,
    deleteUser,
    login,
    updateUser,
    recoverPassword,
    addToFavorites,
    getFavoriteProducts
  }