document.addEventListener('DOMContentLoaded', () => {

    const socket = io();

    socket.emit('message', 'Soy Websocket');

    socket.on('productUpdate', (products) => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Para Limpiar lista actual
        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${product.title}</strong> - ${product.price};
        Descripción: ${product.sdescription} <br />
        Código: ${product.code} <br />
        Stock: ${product.stock} <br />
        Categoría: ${product.category} `;

            productList.appendChild(listItem);
        });

    });
});