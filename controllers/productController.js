const mongoose = require("mongoose");
const Product = require("../models/productSchema");

const getAllProducts = async (req, res) => {
    const product = await Product.find().populate("category")

    try {
        if (!product) {
            return res.status(404).json({
                mensaje: "Productos no encontrados",
                status: 404
            });
        }

        return res.status(200).json({
            mensaje: "Productos encontrados",
            status: 200,
            product
        });

    } catch {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        })
    }
}


const getProductByID = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
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
    const { title, description, price, category, image, stock, favorite} = req.body;
    const product = await Product.findOne({ title });
    console.log(req.file)

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
            image,
            stock,
            favorite
        })
        await newProduct.save();

        return res.status(201).json({
            mensaje: "Producto creado correctamente",
            status: 201,
            newProduct
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, inténtelo más tarde",
            status: 500
        })
    }
}

const changeToFavorite = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const product = await Product.findById(id);
    console.log(product)
    try {
      if (!product) {
        return res.status(404).json({
          mensaje: "Producto no encontrado",
          status: 404,
        });
      }
  
      product.favorite = favorite;
      await product.save();
      res.status(200).json({
        mensaje: "Producto actualizado correctamente",
        status: 200,
        product,
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        mensaje: "Hubo un error, inténtelo más tarde",
        status: 500,
      });
    }
  };


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
    const { title, description, price, category, image, stock, favorite} = req.body;
    try {
    const product = await Product.findByIdAndUpdate( id,{
        title,
        description,
        price,
        category,
        image,
        stock,
        favorite
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

module.exports = {
    getAllProducts,
    getProductByID,
    createProduct,
    changeToFavorite,
    deleteProduct,
    updateProduct
}