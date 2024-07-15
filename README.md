<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="Backend_70065" />

&#xa0;

  <!-- <a href="https://backend_70065.netlify.app">Demo</a> -->
</div>
<!-- 
<h1 align="center">1era Pre-entrega - Backend_70065</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/{{joamilibar}}/backend_70065?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8">
 -->
  <!-- <img alt="Github issues" src="https://img.shields.io/github/issues/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8" /> -->

  <!-- <img alt="Github forks" src="https://img.shields.io/github/forks/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8" /> -->

  <!-- <img alt="Github stars" src="https://img.shields.io/github/stars/{{YOUR_GITHUB_USERNAME}}/backend_70065?color=56BEB8" /> -->
</p>

<!-- Status -->

<h4 align="center">
	  Backend_70065 🚀 1era Pre-entrega...  
</h4>

<br>

## 1era Pre-entrega de Proyecto final

Servidor con endpoints y servicios para gestionar productos y carritos de compra en e-commerce.

- Configuración de servidor Express con escucha en puerto 8080

### Organización:

    BACKEND_70065-root/

```
└── 📁src
    └── README.txt
    └── app.js
    └── 📁data
        └── carts.json
        └── products.json
    └── 📁fileManager
        └── carts.manager.js
        └── products.manager.js
    └── 📁public
        └── index.html
    └── 📁routes
        └── carts.router.js
        └── products.router.js
```

### Creación de Router:

- productsRouter
- cartsRouter

### Implementación de rutas para obtener los productos y carritos

- GET /api/products
- GET /api/carts

### Routes:

Rutas creadas en directorio routes:

- carts.router.js
- products.router.js

### Endpoints:

Configuración de router específico:

Productos: (/api/products):

Implementaron las siguientes rutas dentro del router de productos:

- GET /api/products: Para obtener todos los productos.
- GET /api/products/:pid: Para obtener un producto específico por su id (pid).
- POST /api/products: Para agregar productos.
- POST /api/products/:pid: Acualizar/Modificar productos por id.
- DELETE /api/products/:pid: Para elminar producto por id.

Carts: (/api/carts)

- GET /api/carts: Para listar carritos.
- GET /api/carts/:cid: Para obtener carrito por id y listar productos.
- POST /api/carts: Para agregar nuevo carrito.
- POST /api/carts/:cid/products/:pid: Para agregar producto a carrito por id.

Manejo de Datos:

### Persistencia:

Archivos File System creados en directorio fileManager:

- products.manager.js
- carts.manager.js

Funciones asincronas:

- async readFile
- async writeFile

```


```

### Technologias

Tecnologías utilizadas:

- [Git](<[Git](https://git-scm.com)>)
- [Node.js](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)

## Requirimientos

Antes de iniciar, debes tener instalado: [Git](https://git-scm.com), [Node](https://nodejs.org/en/) and [ExpressJS](https://expressjs.com/)

## Starting

```bash
# Clonar este proyecto
$ git clone https://github.com/Joamilibar/backend_70065.git

# Acceso
$ cd backend_70065

# Instalar dependencias
$ npm init

# Iniciar servidor
$ npm start

# El servidor inicia en: <http://localhost:8080>
```

## Video

[1erPre-entrega_70065](https://www.loom.com/share/c8d92bb4d6fb4224923e2ce7b285d775?sid=176b18a3-f8ad-422a-80f7-3c722635686c)

## License

#### Pública

<!-- This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file. -->

by <a href="https://github.com/Joamilibar" target="_blank">`Joamil Ibarra`</a>

&#xa0;

<a href="#top">Back to top</a>
