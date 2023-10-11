## LAM Music Store
Descripción del Proyecto
LAM Music Store es un sitio web de comercio electrónico dedicado a la venta de artículos musicales. Ofrecemos una amplia variedad de instrumentos, equipos de sonido, accesorios y más, para músicos de todos los niveles y estilos. Nuestro objetivo es brindar a los amantes de la música una plataforma confiable y conveniente para adquirir los productos que necesitan.

## Equipo de Desarrollo
Este proyecto fue desarrollado por el equipo de LAM Music Store, compuesto por:

Lorenzo Albornoz
Franco Salas
Bruno Busnelli

## Instalación

Para comenzar a trabajar con este proyecto en tu entorno local, sigue estos pasos:

Clona el repositorio desde GitHub:

git clone https://github.com/LorenzoAlbornoz/Backend-Music-Store.git
Esto descargará el código fuente del proyecto a tu máquina y te llevará al directorio del proyecto.

Instala las dependencias usando npm:

npm install
Este comando instalará todas las dependencias necesarias para ejecutar la aplicación.

## Inicia la aplicación:

npm run dev

Instala Express:
Express es el framework utilizado para gestionar las rutas y las solicitudes HTTP. Para instalarlo, ejecuta el siguiente comando:

npm install express


## Instalación de Nodemon:
Nodemon se utiliza para facilitar el arranque del servidor y la actualización automática de la aplicación web durante el desarrollo. Para instalarlo, ejecuta:

npm install nodemon --save-dev
Luego, agrega el siguiente script en tu archivo package.json para iniciar el servidor con Nodemon:

"scripts": {
  "dev": "nodemon server.js"
}

## Utilización de Postman:
Usa la herramienta Postman para simular peticiones HTTP y probar la funcionalidad del servidor.

## Instalación de Middlewares:
A continuación, se describen los middlewares instalados y configurados para la aplicación:

CORS:
Permite el acceso controlado a los recursos de la aplicación desde orígenes cruzados o dominios diferentes, útil para solicitudes HTTP desde fuentes externas:

npm install cors

Morgan:
se encarga de mostrar los errores de las peticiones HTTP en la consola. Instálalo con:

npm install morgan

Dotenv:
permite acceder a las variables de entorno de manera segura. Para instalarlo, utiliza:

npm install dotenv

## Creación del Enrutamiento Modular:
La aplicación utiliza módulos de enrutamiento modular (router) para organizar y gestionar las rutas de manera eficiente. Esto mejora la estructura y mantenimiento del código.

## Variables de Entorno:
Se han configurado variables de entorno para garantizar el funcionamiento adecuado y seguro de la aplicación, evitando la inclusión de información confidencial en el código. Se proporciona un archivo example.env con copias vacías de las variables de entorno para referencia.

## Creación de la Estructura del Backend:
Establece la estructura y la organización de las carpetas para el backend de la aplicación.

Configuración de la Base de Datos MongoDB:

Creamos una base de datos NoSQL en MongoDB.

Establece la conexión entre la aplicación y la base de datos.

## Instalación de Mongoose:
La biblioteca Mongoose se utiliza para facilitar la interacción con la base de datos MongoDB, simplificando la definición de esquemas, las validaciones y las operaciones de base de datos en formato JSON. Instálalo con:

npm install mongoose

## Controlador de Usuarios (userController)
Los controladores son funciones que manejan las solicitudes HTTP entrantes y gestionan la lógica de negocio de la aplicación. El controlador de usuarios (userController) incluye las siguientes funciones:

getAllUsers
Esta función recupera todos los usuarios registrados en la base de datos.

getUserByID
Esta función recura un producto por su id registrado en la base de datos

register
La función register permite registrar nuevos usuarios en la aplicación. Además, se instala la librería bcrypt para habilitar la encriptación segura de contraseñas en la aplicación, garantizando la seguridad de las credenciales de usuario.

login
La función login permite a los usuarios registrados iniciar sesión en la aplicación. Para la autenticación y autorización de usuarios, se instala e importa la librería jsonwebtoken para la generación y validación de tokens JWT (Json Web Tokens).

recoverPassword
En caso de querer recuperar la contraseña, la función recoverPassword verifica que el nombre de usuario coincida con uno registrado en la base de datos.

deleteUser
La función deleteUser está diseñada para que los administradores puedan eliminar usuarios de la aplicación.

changeToAdmin
La función changeToAdmin permite a los administradores cambiar el rol de un usuario entre "user" y "admin" y viceversa.

addToFavorites
Esta función permite modificar un producto de no favorito a favorito en la base de datos

getFavoriteProducts
Esta función pertime traer todos los productos que sean favoritos 

## Esquema de Usuario (userSchema)
El esquema userSchema define la estructura en la que se guardan los datos de usuario en la base de datos. Incluye los siguientes campos:

name: Nombre del usuario.
username: Nombre de usuario único.
password: Contraseña del usuario (encriptada de manera segura).
rol: Rol del usuario, que puede ser "user" o "admin".
favoritos: Lista de productos favoritos

## Controlador de Categorías (categoryController)
El controlador de categorías (categoryController) incluye las siguientes funciones:

createCategory
La función createCategory permite crear nuevas categorías en la aplicación.

getAllCategory
La función getAllCategory recupera todas las categorías creadas en la base de datos.

## Esquema de Categoría (categorySchema)
El esquema categorySchema define la estructura en la que se guardan los datos de categoría en la base de datos. Incluye los siguientes campos:

name: El nombre de la categoría.
createdAt: La fecha en que se creó la categoría (tipo de dato Date).
products: Una relación uno a muchos que conecta una categoría con los productos relacionados. Esto se logra a través del ID de la categoría en los productos.

## El controlador de productos (productController) incluye las siguientes funciones:

createProduct
La función createProduct permite la creación de nuevos productos en la base de datos.

getAllProducts
La función getAllProducts recupera todos los productos disponibles en la base de datos.

getProductById
La función getProductById recupera un producto específico mediante su identificador (ID).

deleteProduct
La función deleteProduct elimina un producto de la base de datos.

updateProduct
La función updateProduct actualiza la información de un producto existente en la base de datos.

toggleProductFeaturedStatus
La funcion toggleProductFeaturedStatus cambia los productos de no destacados a destacados.

Instalar Multer
Para manejar la carga de archivos, como imágenes, en la aplicación, se instala Multer, una biblioteca de middleware que permite recibir archivos enviados a través de formularios.
Para instalar multer:

npm install multer

Instalar Cloudinary
Se utiliza Cloudinary para gestionar y almacenar las imágenes de productos. Al subir una imagen en el formulario, Cloudinary devuelve una URL que se guarda en la base de datos.

Para instalar cloudinary:

npm install cloudinary

## Esquema de Producto (productSchema)
El esquema productSchema define la estructura en la que se guardan los datos de productos en la base de datos. Incluye los siguientes campos:

title: El título del producto.
description: Una breve descripción del producto.
price: El precio del producto.
category: La categoría a la que pertenece el producto.
image: La URL o referencia a la imagen del producto (almacenada en Cloudinary).
stock: La cantidad de unidades disponibles en el stock.
shortDescription: Una descripción detallada del producto.
isFeatured:  Un indicador que puede utilizarse para marcar el producto como destacado.
isFavorite: Un indicador que puede utilizarse para marcar el producto como favorito.
quantity: La cantidad de unidades del producto.

Instalación de Passport y Estrategia Passport-JWT
Para gestionar la autenticación de usuarios, utilizamos la librería Passport y la estrategia Passport-JWT para autenticación basada en tokens JWT. Esto permite una autenticación segura y eficiente en el servidor.

npm install passport passport-jwt