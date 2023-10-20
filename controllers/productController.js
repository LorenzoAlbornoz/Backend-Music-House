const mongoose = require("mongoose");
const Product = require("../models/productSchema");
const cloudinary = require("cloudinary").v2

const getAllProducts = async (req, res) => {
    const products = await Product.find().populate("category")

    try {
        if (!products) {
            return res.status(404).json({
                mensaje: "Productos no encontrados",
                status: 404
            });
        }

        return res.status(200).json({
            mensaje: "Productos encontrados",
            status: 200,
            products
        });

    } catch {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        })
    }
}


const getProductByID = async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findById(_id).populate("category");
    try {
        if (!mongoose.isValidObjectId(_id)) {
            return res.status(400).json({
                mensaje: "Id inválido",
                status: 400,
            });
        }
        if (!product) {
            return res.status(404).json({
                mensaje: "Producto no encontrado",
                status: 404,
            });
        }

        return res.status(200).json({
            mensaje: "Producto encontrado",
            status: 200,
            product
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        });
    }
};

const createProduct = async (req, res) => {
    const { title, description, price, category, stock, isFeatured, shortDescription} = req.body;
    const {path} = req.file;
    const product = await Product.findOne({ title });
    const cloudImg = await cloudinary.uploader.upload(path);

    try {
        if (product) {
            return res.status(400).json({
                mensaje: "El Producto ya existe",
                status: 400
            })
        }
        const newProduct = new Product({
            title,
            description,
            price,
            category,
            image: cloudImg.secure_url,
            stock,
            isFeatured,
            shortDescription,
        })
        await newProduct.save();

        return res.status(201).json({
            mensaje: "Producto creado correctamente",
            status: 201,
            newProduct
        })
    } catch (error) {
      console.log(error)
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        })
    }
}

  const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    try {
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
          mensaje: "Id inválido",
          status: 400,
        });
      }
      if (!product) {
        return res.status(404).json({
          mensaje: "Producto no encontrado",
          status: 404,
        });
      }
  
      return res.status(200).json({
        mensaje: "Producto borrado correctamente",
        status: 200,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500,
      });
    }
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category, stock, isFeatured, shortDescription} = req.body;
    try {
    const product = await Product.findByIdAndUpdate( id,{
        title,
        description,
        price,
        category,
        stock,
        isFeatured,
        shortDescription
    }, { new: true });
    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
        status: 404
      });
    }
  
    return res.status(200).json({
      mensaje: "Producto modificado correctamente",
      status: 200,
      product
    });
    } catch (error) {
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500
      });
    }
  };

  const toggleProductFeaturedStatus = async (req, res) => {
    const { id } = req.params;
    const { isFeatured } = req.body;
    const product = await Product.findById(id);
    try {
      if (!product) {
        return res.status(404).json({
          mensaje: 'Producto no encontrado',
          status: 404,
        });
      }
  
      product.isFeatured = isFeatured;
      await product.save();
  
      res.status(200).json({
        mensaje: 'Producto actualizado correctamente',
        status: 200,
        product,
      });
    } catch (error) {
      return res.status(500).json({
        mensaje: 'Hubo un error, inténtelo más tarde',
        status: 500,
      });
    }
  };

module.exports = {
    getAllProducts,
    getProductByID,
    createProduct,
    deleteProduct,
    updateProduct,
    toggleProductFeaturedStatus
}