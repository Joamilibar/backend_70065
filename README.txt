# backend_70065

1era Pre-entrega

Servidor con endpoints y servicios para gestionar productos y carritos de compra en e-commerce.

Organización:

    BACKEND_70065-root/

```
└── 📁src
    └── app.js
    └── 📁public
        └── index.html
    └── 📁routes
        └── carts.router.js
        └── products.router.js
```

- Configuración de servidor Express con escucha en puerto 8080
- Creación de Router:
    productsRouter
    cartsRouter

Implementación de rutas para obtener los productos y carritos

- GET /api/products
- GET /api/carts

Configuración Básica del Servidor:

    Configurar Express y crear una instancia del servidor.
    Configurar el puerto en el que el servidor escuchará (por ejemplo, el puerto 8080).

Endpoints para Productos:

    Configurar un router específico para productos (/api/products).
    Implementar las siguientes rutas dentro del router de productos:
        GET /: Para obtener todos los productos.
        GET /:pid: Para obtener un producto específico por su id (pid).

Manejo de Datos:
