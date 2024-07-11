
const path = require("path");
const fs = require("fs").promises;


const prodFilePath = path.join(__dirname, "../data/products.json");
const cartsFilePath = path.join(__dirname, "../data/carts.json");

async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data);
    } catch (error) {
        console.error("Error al leer el archivo", error);

    }
}

async function writeFile(filePath, content) {
    try {
        await fs.writeFile(filePath, JASON.stringify(content, null, 2), "utf-8")
        console.log("Archivo creado correctamente");
    } catch (error) {
        console.error("Error al crear el archivo", error);
    }
}

async function appendFile() {
    const dataAdicional = "Más información para agregar!";
    try {
        await fs.appendFile("archivo.txt", dataAdicional);
        console.log("Información actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar el archivo", error);
    }
}

